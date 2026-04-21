import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.prod')

# ==============================================================================
# BASE CONFIGURATION
# ==============================================================================
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("SECRET_KEY")

DEBUG = os.getenv("DEBUG")


allowed_hosts = os.getenv("ALLOWED_HOSTS")
ALLOWED_HOSTS = allowed_hosts.split(',')


FORCE_SCRIPT_NAME       = '/api'
USE_X_FORWARDED_HOST    = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT     = os.getenv('SECURE_SSL_REDIRECT', False)
SESSION_COOKIE_SECURE   = os.getenv('SESSION_COOKIE_SECURE', False)
CSRF_COOKIE_SECURE      = os.getenv('CSRF_COOKIE_SECURE', False)


ROOT_URLCONF     = 'core.urls'
WSGI_APPLICATION = 'core.wsgi.application'
ASGI_APPLICATION = 'core.asgi.application'


# ==============================================================================
# APPLICATION DEFINITION
# ==============================================================================
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
    
    # API & Auth Frameworks
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework.authtoken',
    'rest_framework_simplejwt.token_blacklist',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    
    # Allauth
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


# ==============================================================================
# DATABASE CONFIGURATION
# ==============================================================================
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


# ==============================================================================
# AUTHENTICATION & PASSWORD VALIDATION
# ==============================================================================
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

AUTHENTICATION_BACKENDS = [
    'allauth.account.auth_backends.AuthenticationBackend'
]

# Allauth Config
ACCOUNT_LOGIN_METHODS      = {'email'}
ACCOUNT_SIGNUP_FIELDS      = ['username*', 'email*', 'email2*', 'password1*', 'password2*']
ACCOUNT_UNIQUE_EMAIL       = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_ADAPTER            = 'authentication.adapter.AccountAdapter'

# Social Auth
SOCIALACCOUNT_AUTO_SIGNUP          = True
SOCIALACCOUNT_QUERY_EMAIL          = True
SOCIALACCOUNT_EMAIL_AUTHENTICATION = True

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id' : os.getenv('GOOGLE_CLIENT_ID'),
            'secret'    : os.getenv('GOOGLE_SECRET_KEY'),
            'key'       : '' 
        }
    }
}


# ==============================================================================
# STATIC & MEDIA FILES
# ==============================================================================
STATIC_URL       = 'static/'
STATIC_ROOT      = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

MEDIA_URL  = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DATA_UPLOAD_MAX_MEMORY_SIZE = 10485760 
FILE_UPLOAD_MAX_MEMORY_SIZE = 10485760


# ==============================================================================
# CORS & CSRF
# ==============================================================================
CORS_ALLOWED_ORIGINS   = ["http://localhost:5173", "http://127.0.0.1:5173"]
CORS_ALLOW_CREDENTIALS = True
CORS_EXPOSE_HEADERS    = ['Content-Type', 'X-CSRFToken']
    
CSRF_TRUSTED_ORIGINS    = ["http://localhost:5173", "http://127.0.0.1:5173"]
CSRF_COOKIE_HTTPONLY    = False
CSRF_COOKIE_NAME        = 'csrftoken'
CSRF_HEADER_NAME        = 'HTTP_X_CSRFTOKEN'
CSRF_USE_SESSIONS       = False 
CSRF_COOKIE_SAMESITE    = 'Lax'

SESSION_COOKIE_SAMESITE = 'Lax'


# ==============================================================================
# REST FRAMEWORK & JWT
# ==============================================================================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME'    : timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME'   : timedelta(days=1),
    'ROTATE_REFRESH_TOKENS'    : True,
    'BLACKLIST_AFTER_ROTATION' : True,
    'UPDATE_LAST_LOGIN'        : True
}

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


# ==============================================================================
# CHANNELS & SPECTACULAR
# ==============================================================================
CHANNEL_LAYERS = {
    "default" : {
        "BACKEND" : "channels_redis.core.RedisChannelLayer",
        "CONFIG"  : {
            "hosts" : [(os.getenv('CHANNEL_HOST'), 6379)]   
        } 
    }
} 

SPECTACULAR_SETTINGS = {
    'TITLE'                 : 'Monitoring IoT Device API',
    'DESCRIPTION'           : 'Dokumentasi API untuk Monitoring IoT berbasis Django dan React',
    'VERSION'               : '1.0.0',
    'SERVE_INCLUDE_SCHEMA'  : False,
}


# ==============================================================================
# EMAIL
# ==============================================================================
EMAIL_BACKEND       = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST          = 'smtp.gmail.com'
EMAIL_PORT          = 587 
EMAIL_USE_TLS       = True
EMAIL_HOST_USER     = os.getenv("GOOGLE_EMAIL")
EMAIL_HOST_PASSWORD = os.getenv("GOOGLE_PASSWORD")
DEFAULT_FROM_EMAIL  = os.getenv("GOOGLE_EMAIL")


# ==============================================================================
# LOCALIZATION
# ==============================================================================
LANGUAGE_CODE = 'en-us'
TIME_ZONE     = 'UTC'
USE_I18N      = True
USE_TZ        = True