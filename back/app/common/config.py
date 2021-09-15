from pydantic import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY = 'secret'
    DB_HOST = 'localhost'
    DB_USER = 'user'
    DB_PASSWORD = 'root'
    DB_NAME = 'test'



def conf():
    settings = Settings()
    return settings
