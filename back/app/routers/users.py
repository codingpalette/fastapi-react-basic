from fastapi import Depends,APIRouter,HTTPException,status, Request, Header, Response
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
import jwt

# import sys, os
# sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from back.app.models import users

# from ..models import users
from common.config import conf

router = APIRouter(
    prefix="/users",
)

class JoinType(BaseModel):
    email: str
    nickname: str
    password: str

class LoginType(BaseModel):
    email: str
    password: str


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

async def auth_check(token):
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        print(payload)
        print(payload["email"])
        email : str = payload.get('email')
        if email:
            print('이메일 있음')
            user_info = users.UserModel.get_email_user(email)
            if user_info:
                return {
                    "result": "success",
                    "message": "유저 정보 확인",
                    "user": {
                        "email": user_info["email"],
                        "nickname": user_info["nickname"],
                    },
                }
            else:
                return {
                    "result": "fail",
                    "message": "유저 정보가 올바르지 않습니다",
                }
    except jwt.exceptions.InvalidTokenError:
        return JSONResponse(status_code=401, content={"message": "토큰 인증 실패"})




@router.get("/")
async def get_user(token: str = Depends(oauth2_scheme)):
    return await auth_check(token)
    # payload = jwt.decode(token, conf().SECRET_KEY, algorithms=['HS256'])
    # print(payload)


@router.post("/join", status_code=201)
async def create_user(data: JoinType):
    return users.UserModel.join(data)

@router.post('/login', status_code=201)
async def login_user(data: LoginType):
    return users.UserModel.login(data)