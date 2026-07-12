import json
import os
import psycopg2
import psycopg2.extras


def check_auth(cur, headers) -> bool:
    token = headers.get('x-auth-token') or headers.get('X-Auth-Token')
    if not token:
        return False
    cur.execute("SELECT admin_id FROM admin_sessions WHERE token = %s AND expires_at > NOW()", (token,))
    return cur.fetchone() is not None


def handler(event: dict, context) -> dict:
    """CRUD для каталога товаров (свай). GET публичный, POST/PUT/DELETE только для авторизованных админов"""
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
                cur.execute("SELECT * FROM products ORDER BY sort_order, id")
            else:
                cur.execute("SELECT * FROM products WHERE is_active = TRUE ORDER BY sort_order, id")
            rows = cur.fetchall()
            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps(rows, default=str)}

        if not check_auth(cur, req_headers):
            return {'statusCode': 401, 'headers': headers_resp, 'body': json.dumps({'error': 'Требуется авторизация'})}

        if method == 'POST':
            body = json.loads(event.get('body') or '{}')
            cur.execute(
                """INSERT INTO products (name, type, length, diameter, price, description, sort_order, is_active, image_url)
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *""",
                (
                    body.get('name', ''), body.get('type', ''), body.get('length', ''),
                    body.get('diameter', ''), body.get('price', 'по запросу'),
                    body.get('description', ''), body.get('sort_order', 0),
                    body.get('is_active', True), body.get('image_url', '')
                )
            )
            row = cur.fetchone()
            conn.commit()
            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps(row, default=str)}

        if method == 'PUT':
            body = json.loads(event.get('body') or '{}')
            product_id = body.get('id')
            if not product_id:
                return {'statusCode': 400, 'headers': headers_resp, 'body': json.dumps({'error': 'Не указан id'})}
            cur.execute(
                """UPDATE products SET name=%s, type=%s, length=%s, diameter=%s, price=%s,
                   description=%s, sort_order=%s, is_active=%s, image_url=%s WHERE id=%s RETURNING *""",
                (
                    body.get('name', ''), body.get('type', ''), body.get('length', ''),
                    body.get('diameter', ''), body.get('price', 'по запросу'),
                    body.get('description', ''), body.get('sort_order', 0),
                    body.get('is_active', True), body.get('image_url', ''), product_id
                )
            )
            row = cur.fetchone()
            conn.commit()
            if not row:
                return {'statusCode': 404, 'headers': headers_resp, 'body': json.dumps({'error': 'Товар не найден'})}
            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps(row, default=str)}

        if method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            product_id = params.get('id')
            if not product_id:
                return {'statusCode': 400, 'headers': headers_resp, 'body': json.dumps({'error': 'Не указан id'})}
            cur.execute("DELETE FROM products WHERE id = %s", (product_id,))
            conn.commit()
            return {'statusCode': 200, 'headers': headers_resp, 'body': json.dumps({'ok': True})}

        return {'statusCode': 405, 'headers': headers_resp, 'body': json.dumps({'error': 'Метод не поддерживается'})}
    except Exception:
        conn.rollback()
        return {'statusCode': 500, 'headers': headers_resp, 'body': json.dumps({'error': 'Внутренняя ошибка сервера'})}
    finally:
        cur.close()
        conn.close()