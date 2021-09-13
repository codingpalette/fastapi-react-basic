from pydantic import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY = 'secret'


def conf():
    settings = Settings()
    return settings
