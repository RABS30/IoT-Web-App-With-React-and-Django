from dj_rest_auth.registration.serializers  import RegisterSerializer
from dj_rest_auth.serializers               import PasswordResetSerializer

from allauth.account                import app_settings as allauth_account_settings
from allauth.account.adapter        import get_adapter
from allauth.socialaccount.models   import EmailAddress
from allauth.account.utils          import user_pk_to_url_str

from rest_framework import serializers

from django.utils.translation import gettext_lazy as _





class CustomRegisterSerializer(RegisterSerializer):
    # Validasi email saat pengguna membuat akun baru (satu email untuk satu akun)
    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_account_settings.UNIQUE_EMAIL:
            if email and EmailAddress.objects.filter(email__iexact=email).exists():
                raise serializers.ValidationError(
                    _('User is already registered with this e-mail address.'),
                )
        return email
    

class CustomPasswordResetSerializer(PasswordResetSerializer):
    # Mengubah urls yang dikirim melalui gmail untuk pengguna reset password 
    def url_generator(self, request, user, temp_key):
        path = f'http://localhost:5173/new-password/{user_pk_to_url_str(user)}/{temp_key}/'

        path = path.replace('%3F', '?')

        return path

    def get_email_options(self):
        return {'url_generator' : self.url_generator}