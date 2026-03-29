import os
from pathlib import Path
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent



# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")



# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = [
  
]



# Application definition
INSTALLED_APPS = [
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # App
    'core',
    'device',
    'authentication',
    # Security
    'corsheaders',
    # API
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework.authtoken',
    'rest_framework_simplejwt.token_blacklist',
    # Authentication
    'dj_rest_auth',
    'dj_rest_auth.registration',
    
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ["templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'
ASGI_APPLICATION = 'core.asgi.application'


# Database
DATABASES = {
    'default': {
        'ENGINE'    : 'django.db.backends.postgresql',
        'NAME'      : os.getenv("DATABASE_NAME"),
        'USER'      : os.getenv("DATABASE_USER"),
        'PASSWORD'  : os.getenv("DATABASE_PASS"),
        'HOST'      : os.getenv("DATABASE_HOST"),
        'PORT'      : os.getenv("DATABASE_PORT"),
    
        'DISABLE_SERVER_SIDE_CURSORS': True,
    }
}



# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Authentication Configuration
AUTHENTICATION_BACKENDS = [
    # 'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend'
]



# Region and Timezone
LANGUAGE_CODE   = 'en-us'
TIME_ZONE       = 'UTC'
USE_I18N        = True
USE_TZ          = True



# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'



# CORS and CSRF
CORS_ALLOWED_ORIGINS    = [
    "http://localhost:5173",
]
CORS_ALLOW_CREDENTIALS  = True
CSRF_TRUSTED_ORIGINS    = [
    "http://localhost:5173",
]



# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    ]
}



# Channels Django
CHANNEL_LAYERS = {
    "default" : {
        "BACKEND"   : "channels_redis.core.RedisChannelLayer",
        "CONFIG"    : {
            "hosts"     : [("127.0.0.1", 6379)]   
        } 
    }
} 



# Dj Rest Auth Configuration
REST_AUTH = {
    'USE_JWT'                   : True,
    'JWT_AUTH_COOKIE'           : 'access',
    'JWT_AUTH_REFRESH_COOKIE'   : 'refresh',
    'JWT_AUTH_HTTPONLY'         : True,
    'JWT_AUTH_SECURE'           : False,
    'JWT_AUTH_SAMESITE'         : 'Lax',
    'JWT_AUTH_RETURN_EXPIRATION': True,
}


# Allauth Configuration
ACCOUNT_LOGIN_METHODS               = {'email'}                                             # Login menggunakan email
ACCOUNT_SIGNUP_FIELDS               = ['username*', 'email*', 'email2*', 'password1*', 'password2*']
ACCOUNT_UNIQUE_EMAIL                = True                                                  # Satu email hanya untuk satu akun
ACCOUNT_EMAIL_VERIFICATION          = 'mandatory'
ACCOUNT_ADAPTER                     = 'authentication.adapter.AccountAdapter'

# JWT Token Configuration
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME'     : timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME'    : timedelta(days=1),
    'ROTATE_REFRESH_TOKENS'     : True,
    'BLACKLIST_AFTER_ROTATION'  : True,
    'UPDATE_LAST_LOGIN'         : True
}



# Email configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
DEFAULT_FROM_EMAIL = 'emailforhostuser@gmail.com'
EMAIL_PORT = 587 
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'emailforhostuser@gmail.com'
EMAIL_HOST_PASSWORD = os.getenv("GOOGLE_PASSWORD")




 















