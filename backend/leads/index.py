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


def send_notification(name: str, phone: str, comment: str):
    password = os.environ.get('SMTP_PASSWORD')
    if not password:
        return
    body = f"Новая заявка с сайта\n\nИмя: {name}\nТелефон: {phone}\nКомментарий: {comment or '-'}"
    msg = MIMEText(body, _charset='utf-8')
    msg['Subject'] = 'Новая заявка с сайта СваиВладимир'
    msg['From'] = SMTP_LOGIN
    msg['To'] = NOTIFY_EMAIL
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=10) as server:
        server.login(SMTP_LOGIN, password)
        server.sendmail(SMTP_LOGIN, [NOTIFY_EMAIL], msg.as_string())


def handler(event: dict, context) -> dict:
    """Заявки с формы обратной связи. POST публичный (отправка заявки, с защитой от спама и email-уведомлением), GET/PUT/DELETE только для админа"""
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
        if method == 'POST':
            body = json.loads(event.get('body') or '{}')
            name = body.get('name', '').strip()
            phone = body.get('phone', '').strip()
            if not name or not phone:
                return {'statusCode': 400, 'headers': headers_resp, 'body': json.dumps({'error': 'Заполните имя и телефон'})}

            ip = get_client_ip(event)
            cur.execute(
                "SELECT COUNT(*) as cnt FROM leads WHERE source_ip = %s AND created_at > NOW() - INTERVAL '10 minutes'",
                (ip,)
            )
            recent_count = cur.fetchone()['cnt']
            if recent_count >= 3:
                return {'statusCode': 429, 'headers': headers_resp, 'body': json.dumps({'error': 'Слишком много заявок. Попробуйте позже'})}

            comment = body.get('comment', '')
            cur.execute(
                """INSERT INTO leads (name, phone, comment, source, source_ip) VALUES (%s, %s, %s, %s, %s) RETURNING *""",
                (name, phone, comment, body.get('source', 'contact_form'), ip)
            )
            row = cur.fetchone()
            conn.commit()

            try:
                send_notification(name, phone, comment)
            except Exception as e:
                print(f"Email notification failed: {e}")

            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps(row, default=str)}

        if not check_auth(cur, req_headers):
            return {'statusCode': 401, 'headers': headers_resp, 'body': json.dumps({'error': 'Требуется авторизация'})}

        if method == 'GET':
            cur.execute("SELECT * FROM leads ORDER BY created_at DESC")
            rows = cur.fetchall()
            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps(rows, default=str)}

        if method == 'PUT':
            body = json.loads(event.get('body') or '{}')
            lead_id = body.get('id')
            if not lead_id:
                return {'statusCode': 400, 'headers': headers_resp, 'body': json.dumps({'error': 'Не указан id'})}
            cur.execute(
                "UPDATE leads SET is_processed = %s WHERE id = %s RETURNING *",
                (body.get('is_processed', True), lead_id)
            )
            row = cur.fetchone()
            conn.commit()
            if not row:
                return {'statusCode': 404, 'headers': headers_resp, 'body': json.dumps({'error': 'Заявка не найдена'})}
            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps(row, default=str)}

        if method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            lead_id = params.get('id')
            if not lead_id:
                return {'statusCode': 400, 'headers': headers_resp, 'body': json.dumps({'error': 'Не указан id'})}
            cur.execute("DELETE FROM leads WHERE id = %s", (lead_id,))
            conn.commit()
            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps({'ok': True})}

        return {'statusCode': 405, 'headers': headers_resp, 'body': json.dumps({'error': 'Метод не поддерживается'})}
    except Exception:
        conn.rollback()
        return {'statusCode': 500, 'headers': headers_resp, 'body': json.dumps({'error': 'Внутренняя ошибка сервера'})}
    finally:
        cur.close()
        conn.close()