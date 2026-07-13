import json
import os
import smtplib
from email.mime.text import MIMEText
import psycopg2
import psycopg2.extras


NOTIFY_EMAIL = 'vladsvai@bk.ru'
SMTP_LOGIN = 'vladsvai33@mail.ru'
SMTP_HOST = 'smtp.mail.ru'
SMTP_PORT = 465


def send_notification(company: str, author: str, text: str, rating: int):
    password = os.environ.get('SMTP_PASSWORD')
    if not password:
        return
    body = f"Новый отзыв на сайте\n\nКомпания: {company or '-'}\nАвтор: {author}\nОценка: {rating}\nТекст: {text}"
    msg = MIMEText(body, _charset='utf-8')
    msg['Subject'] = 'Новый отзыв на сайте СваиВладимир'
    msg['From'] = SMTP_LOGIN
    msg['To'] = NOTIFY_EMAIL
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=10) as server:
        server.login(SMTP_LOGIN, password)
        server.sendmail(SMTP_LOGIN, [NOTIFY_EMAIL], msg.as_string())


def check_auth(cur, headers) -> bool:
    token = headers.get('x-auth-token') or headers.get('X-Auth-Token')
    if not token:
        return False
    cur.execute("SELECT admin_id FROM admin_sessions WHERE token = %s AND expires_at > NOW()", (token,))
    return cur.fetchone() is not None


def get_client_ip(event: dict) -> str:
    return (
        event.get('requestContext', {})
        .get('identity', {})
        .get('sourceIp', 'unknown')
    )


def handler(event: dict, context) -> dict:
    """Отзывы клиентов: публичное добавление и чтение опубликованных, админ управляет публикацией"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers_resp = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    try:
        dsn = os.environ['DATABASE_URL']
        conn = psycopg2.connect(dsn)
    except Exception:
        return {'statusCode': 503, 'headers': headers_resp, 'body': json.dumps({'error': 'Сервис временно недоступен, попробуйте позже'})}

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    req_headers = event.get('headers', {})

    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            if params.get('all') == '1':
                if not check_auth(cur, req_headers):
                    return {'statusCode': 401, 'headers': headers_resp, 'body': json.dumps({'error': 'Требуется авторизация'})}
                cur.execute("SELECT * FROM reviews ORDER BY created_at DESC")
            else:
                cur.execute("SELECT * FROM reviews WHERE is_published = TRUE ORDER BY created_at DESC")
            rows = cur.fetchall()
            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps(rows, default=str)}

        if method == 'POST':
            body = json.loads(event.get('body') or '{}')
            author = body.get('author', '').strip()
            text = body.get('text', '').strip()
            if not author or not text:
                return {'statusCode': 400, 'headers': headers_resp, 'body': json.dumps({'error': 'Заполните имя и текст отзыва'})}

            ip = get_client_ip(event)
            cur.execute(
                "SELECT COUNT(*) as cnt FROM reviews WHERE source_ip = %s AND created_at > NOW() - INTERVAL '10 minutes'",
                (ip,)
            )
            recent_count = cur.fetchone()['cnt']
            if recent_count >= 3:
                return {'statusCode': 429, 'headers': headers_resp, 'body': json.dumps({'error': 'Слишком много отзывов. Попробуйте позже'})}

            cur.execute(
                """INSERT INTO reviews (company, author, position, text, rating, is_published, source_ip)
                   VALUES (%s, %s, %s, %s, %s, FALSE, %s) RETURNING *""",
                (
                    body.get('company', ''), author, body.get('position', ''),
                    text, body.get('rating', 5), ip
                )
            )
            row = cur.fetchone()
            conn.commit()

            try:
                send_notification(body.get('company', ''), author, text, body.get('rating', 5))
            except Exception:
                pass

            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps(row, default=str)}

        if not check_auth(cur, req_headers):
            return {'statusCode': 401, 'headers': headers_resp, 'body': json.dumps({'error': 'Требуется авторизация'})}

        if method == 'PUT':
            body = json.loads(event.get('body') or '{}')
            review_id = body.get('id')
            if not review_id:
                return {'statusCode': 400, 'headers': headers_resp, 'body': json.dumps({'error': 'Не указан id'})}
            cur.execute(
                """UPDATE reviews SET company=%s, author=%s, position=%s, text=%s, rating=%s, is_published=%s
                   WHERE id=%s RETURNING *""",
                (
                    body.get('company', ''), body.get('author', ''), body.get('position', ''),
                    body.get('text', ''), body.get('rating', 5), body.get('is_published', False),
                    review_id
                )
            )
            row = cur.fetchone()
            conn.commit()
            if not row:
                return {'statusCode': 404, 'headers': headers_resp, 'body': json.dumps({'error': 'Отзыв не найден'})}
            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps(row, default=str)}

        if method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            review_id = params.get('id')
            if not review_id:
                return {'statusCode': 400, 'headers': headers_resp, 'body': json.dumps({'error': 'Не указан id'})}
            cur.execute("DELETE FROM reviews WHERE id = %s", (review_id,))
            conn.commit()
            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps({'ok': True})}

        return {'statusCode': 405, 'headers': headers_resp, 'body': json.dumps({'error': 'Метод не поддерживается'})}
    except Exception:
        conn.rollback()
        return {'statusCode': 500, 'headers': headers_resp, 'body': json.dumps({'error': 'Внутренняя ошибка сервера'})}
    finally:
        cur.close()
        conn.close()