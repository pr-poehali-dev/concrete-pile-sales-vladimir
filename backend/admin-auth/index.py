import json
import os
import secrets
from datetime import datetime, timedelta
import psycopg2
import bcrypt


def handler(event: dict, context) -> dict:
    """Авторизация в админ-панель: логин, проверка сессии, выход, смена пароля"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    try:
        dsn = os.environ['DATABASE_URL']
        conn = psycopg2.connect(dsn)
    except Exception:
        return {'statusCode': 503, 'headers': headers, 'body': json.dumps({'error': 'Сервис временно недоступен, попробуйте позже'})}

    cur = conn.cursor()

    try:
        params = event.get('queryStringParameters') or {}
        action = params.get('action', '')

        if method == 'POST' and action == 'login':
            body = json.loads(event.get('body') or '{}')
            username = body.get('username', '')
            password = body.get('password', '')

            cur.execute("SELECT id, password_hash FROM admin_users WHERE username = %s", (username,))
            row = cur.fetchone()

            if not row or not bcrypt.checkpw(password.encode(), row[1].encode()):
                return {
                    'statusCode': 401,
                    'headers': headers,
                    'body': json.dumps({'error': 'Неверный логин или пароль'})
                }

            admin_id = row[0]
            token = secrets.token_hex(32)
            expires_at = datetime.utcnow() + timedelta(days=7)

            cur.execute(
                "INSERT INTO admin_sessions (token, admin_id, expires_at) VALUES (%s, %s, %s)",
                (token, admin_id, expires_at)
            )
            conn.commit()

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'token': token})
            }

        if method == 'GET' and action == 'check':
            token = event.get('headers', {}).get('x-auth-token') or event.get('headers', {}).get('X-Auth-Token')
            if not token:
                return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'Нет токена'})}

            cur.execute(
                "SELECT admin_id FROM admin_sessions WHERE token = %s AND expires_at > NOW()",
                (token,)
            )
            row = cur.fetchone()
            if not row:
                return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'Сессия истекла'})}

            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'valid': True})}

        if method == 'POST' and action == 'logout':
            token = event.get('headers', {}).get('x-auth-token') or event.get('headers', {}).get('X-Auth-Token')
            if token:
                cur.execute("DELETE FROM admin_sessions WHERE token = %s", (token,))
                conn.commit()
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}

        if method == 'POST' and action == 'change_password':
            token = event.get('headers', {}).get('x-auth-token') or event.get('headers', {}).get('X-Auth-Token')
            if not token:
                return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'Требуется авторизация'})}

            cur.execute(
                "SELECT admin_id FROM admin_sessions WHERE token = %s AND expires_at > NOW()",
                (token,)
            )
            session_row = cur.fetchone()
            if not session_row:
                return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'Сессия истекла'})}

            admin_id = session_row[0]
            body = json.loads(event.get('body') or '{}')
            old_password = body.get('old_password', '')
            new_password = body.get('new_password', '')

            if not new_password or len(new_password) < 6:
                return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Новый пароль должен быть не короче 6 символов'})}

            cur.execute("SELECT password_hash FROM admin_users WHERE id = %s", (admin_id,))
            user_row = cur.fetchone()
            if not user_row or not bcrypt.checkpw(old_password.encode(), user_row[0].encode()):
                return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'Неверный текущий пароль'})}

            new_hash = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
            cur.execute("UPDATE admin_users SET password_hash = %s WHERE id = %s", (new_hash, admin_id))
            cur.execute("DELETE FROM admin_sessions WHERE admin_id = %s AND token != %s", (admin_id, token))
            conn.commit()

            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}

        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Неизвестное действие'})}
    except Exception:
        conn.rollback()
        return {'statusCode': 500, 'headers': headers, 'body': json.dumps({'error': 'Внутренняя ошибка сервера'})}
    finally:
        cur.close()
        conn.close()
