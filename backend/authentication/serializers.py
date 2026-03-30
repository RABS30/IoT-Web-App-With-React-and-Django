from dj_rest_auth.registration.serializers import RegisterSerializer

from allauth.account import app_settings as allauth_account_settings
from allauth.account.adapter import get_adapter

from allauth.socialaccount.models import EmailAddress

from rest_framework import serializers

from django.utils.translation import gettext_lazy as _




class CustomRegisterSerializer(RegisterSerializer):
    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_account_settings.UNIQUE_EMAIL:
            if email and EmailAddress.objects.filter(email__iexact=email).exists():
                raise serializers.ValidationError(
                    _('User is already registered with this e-mail address.'),
                )
        return email