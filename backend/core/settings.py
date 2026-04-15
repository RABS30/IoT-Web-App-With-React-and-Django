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
DEBUG = False
ALLOWED_HOSTS = [
  '*'
]
FORCE_SCRIPT_NAME = '/api'
USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


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
    
    # API Documentation
    'drf_spectacular',
    
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
# 1. URL untuk akses via browser
STATIC_URL = 'static/'

# 2. FOLDER TUJUAN (PENTING UNTUK DOCKER)
# Jalur ini harus sama dengan yang ada di Dockerfile/Docker Compose
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# 3. (Opsional) Jika Anda punya folder static tambahan di luar aplikasi
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# settings.py
DATA_UPLOAD_MAX_MEMORY_SIZE = 10485760  # 10MB dalam bytes
FILE_UPLOAD_MAX_MEMORY_SIZE = 10485760


# Folder fisik di komputer tempat file disimpan
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# URL yang digunakan untuk mengakses file di browser
MEDIA_URL = '/media/'




# CORS and CSRF
CORS_ALLOWED_ORIGINS    = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
CORS_ALLOW_CREDENTIALS  = True
CORS_EXPOSE_HEADERS     = ['Content-Type', 'X-CSRFToken']
    
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
CSRF_COOKIE_HTTPONLY    = False

SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SAMESITE    = 'Lax'
CSRF_COOKIE_NAME        = 'csrftoken'
CSRF_HEADER_NAME        = 'HTTP_X_CSRFTOKEN'
CSRF_USE_SESSIONS       = False 

 
# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# Documentation API
SPECTACULAR_SETTINGS = {
    'TITLE': 'Monitoring IoT Device API',
    'DESCRIPTION': 'Dokumentasi API untuk Monitoring IoT berbasis Django dan React',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}



# Channels Django
CHANNEL_LAYERS = {
    "default" : {
        "BACKEND"   : "channels_redis.core.RedisChannelLayer",
        "CONFIG"    : {
            "hosts"     : [("redis", 6379)]   
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
    'OLD_PASSWORD_FIELD_ENABLED': True,
    'REGISTER_SERIALIZER'       : 'authentication.serializers.CustomRegisterSerializer',
    'PASSWORD_RESET_SERIALIZER' : 'authentication.serializers.CustomPasswordResetSerializer',
    'USER_DETAILS_SERIALIZER'   : 'authentication.serializers.CustomUserDetailsSerializer'
}
# Menambahkan fitur reset password dan change password, serta memperbarui URL konfirmasi email. Memperbaiki struktur dan menambahkan komponen baru untuk pengelolaan password.

# Allauth Configuration
ACCOUNT_LOGIN_METHODS               = {'email'}                                             # Login menggunakan email
ACCOUNT_SIGNUP_FIELDS               = ['username*', 'email*', 'email2*', 'password1*', 'password2*']
ACCOUNT_UNIQUE_EMAIL                = True                                                  # Satu email hanya untuk satu akun
ACCOUNT_EMAIL_VERIFICATION          = 'mandatory'
SOCIALACCOUNT_AUTO_SIGNUP           = True
SOCIALACCOUNT_QUERY_EMAIL           = True
SOCIALACCOUNT_EMAIL_AUTHENTICATION  = True
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
EMAIL_BACKEND       = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST          = 'smtp.gmail.com'
DEFAULT_FROM_EMAIL  = os.getenv("GOOGLE_EMAIL")
EMAIL_PORT          = 587 
EMAIL_USE_TLS       = True
EMAIL_HOST_USER     = os.getenv("GOOGLE_EMAIL")
EMAIL_HOST_PASSWORD = os.getenv("GOOGLE_PASSWORD")




SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': os.getenv('GOOGLE_CLIENT_ID'),
            'secret': os.getenv('GOOGLE_SECRET_KEY'),
            'key': '' 
        }
    }
}















