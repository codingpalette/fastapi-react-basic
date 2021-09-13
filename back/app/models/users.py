import pymysql
import bcrypt
import jwt
import datetime
from common.config import conf

class UserModel():
    def __init__(self):
        self.email = str
        self.nickname = str
        self.password = str

    def join(data):
        #mysql
        conn = pymysql.connect(host='localhost', user='root', password='root', db='test', charset='utf8')
        try:
            curs = conn.cursor(pymysql.cursors.DictCursor)
            email_sql = '''SELECT email FROM users WHERE email = %s;'''
            curs.execute(email_sql, data.email)
            user_info = curs.fetchone()

            if user_info:
                return {"result": "fail", "message": "이미 존재하는 이메일 입니다"}
            else:
                join_sql = '''INSERT INTO `users` (email, nickname, password) VALUES (%s, %s, %s);'''
                hashed_password = bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt())
                save_password = hashed_password.decode('utf-8')
                curs.execute(join_sql, (data.email, data.nickname, save_password))
                conn.commit()

                return {"result": "success", "message": "회원가입에 성공했습니다"}
        except:
            return {"result": "fail", "message": "서버 에러가 발생했습니다"}

    def login(data):
        print(data)
        conn = pymysql.connect(host='localhost', user='root', password='root', db='test', charset='utf8')
        try:
            curs = conn.cursor(pymysql.cursors.DictCursor)
            email_sql = '''SELECT email, nickname, password FROM users WHERE email = %s;'''
            curs.execute(email_sql, data.email)
            user_info = curs.fetchone()
            if not user_info:
                return {"result": "fail", "message": "존재하지 않는 이메일입니다"}
            else:
                password_check = bcrypt.checkpw(data.password.encode('utf-8'), user_info["password"].encode('utf-8'))
                if not password_check:
                    return {"result": "fail", "message": "비밀번호가 틀립니다"}
                else:
                    # access_token = Authorize.create_access_token(subject=user.username)
                    # refresh_token = Authorize.create_refresh_token(subject=user.username)

                    payload = {"email":data.email , 'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=300)}
                    key = conf().SECRET_KEY
                    alg = 'HS256'
                    access_token = jwt.encode(payload=payload, key=key, algorithm=alg)
                    print(access_token)
                    return {
                        "result": "success",
                        "message": "로그인 성공",
                        "access_token": access_token,
                    }

        except:
            return {"result": "fail", "message": "서버 에러가 발생했습니다"}
        return True

    def get_email_user(email):
        conn = pymysql.connect(host='localhost', user='root', password='root', db='test', charset='utf8')
        try:
            curs = conn.cursor(pymysql.cursors.DictCursor)
            email_sql = '''SELECT email, nickname, password FROM users WHERE email = %s;'''
            curs.execute(email_sql,email)
            return curs.fetchone()
        except:
            return False

