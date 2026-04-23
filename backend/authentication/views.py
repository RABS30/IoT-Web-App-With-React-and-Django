from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

import os
from dotenv import load_dotenv
load_dotenv()

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = f'{os.getenv('MY_SITE_URL')}/auth/google/callback/'
    client_class = OAuth2Client