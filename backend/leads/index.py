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
    """Заявки с формы обратной связи. POST публичный (отправка заявки), GET/PUT/DELETE только для админа"""
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
    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    req_headers = event.get('headers', {})

    try:
        if method == 'POST':
            body = json.loads(event.get('body') or '{}')
            name = body.get('name', '').strip()
            phone = body.get('phone', '').strip()
            if not name or not phone:
                return {'statusCode': 400, 'headers': headers_resp, 'body': json.dumps({'error': 'Заполните имя и телефон'})}
            cur.execute(
                """INSERT INTO leads (name, phone, comment, source) VALUES (%s, %s, %s, %s) RETURNING *""",
                (name, phone, body.get('comment', ''), body.get('source', 'contact_form'))
            )
            row = cur.fetchone()
            conn.commit()
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
    finally:
        cur.close()
        conn.close()
