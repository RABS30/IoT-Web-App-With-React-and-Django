from dj_rest_auth.registration.serializers  import RegisterSerializer
from dj_rest_auth.serializers               import PasswordResetSerializer, UserDetailsSerializer

from allauth.account                import app_settings as allauth_account_settings
from allauth.account.adapter        import get_adapter
from allauth.socialaccount.models   import EmailAddress
from allauth.account.utils          import user_pk_to_url_str

from rest_framework import serializers

from django.utils.translation import gettext_lazy as _


from .models import UserProfileModel


import os

from dotenv import load_dotenv
load_dotenv()

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
    # Urls yang dikirim melalui gmail untuk pengguna reset password 
    def url_generator(self, request, user, temp_key):
        path = f'{os.getenv('MY_SITE_URL')}/new-password/{user_pk_to_url_str(user)}/{temp_key}/'

        path = path.replace('%3F', '?')

        return path

    def get_email_options(self):
        return {'url_generator' : self.url_generator}
    
    
    
class CustomUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model  = UserProfileModel
        fields = ('avatar', )
        
    # Data yang akan dikirim ke frontend
    def to_representation(self, instance):
        # jika belum memiliki avatar maka return langsung
        if instance.get_avatar_url == '' :
            return 
        
        # Mengambil semua data yang sudah diserialisasi
        representation = super().to_representation(instance)
        # Mengammbil request untuk build_request_uri
        request = self.context.get('request')
        # Mengambil url avatar
        avatar_path = instance.get_avatar_url
        # Mengganti avatar yang akan ditampilkan
        representation['avatar'] = request.build_absolute_uri(avatar_path)

        return representation
        


class CustomUserDetailsSerializer(UserDetailsSerializer):
    profile     = CustomUserProfileSerializer()
    full_name   = serializers.SerializerMethodField()
    is_verified = serializers.SerializerMethodField()
    
    class Meta(UserDetailsSerializer.Meta):
        fields              = ('username', 'email', 'first_name', 'last_name', 'full_name', 'profile', 'is_verified')
        read_only_fields    = ('username', 'email', 'full_name', 'is_verified')
        
    # Mendapatkan full name
    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'.strip() or obj.username

    # Mendapatkan status verifikasi
    def get_is_verified(self, obj):
        primary_email = obj.emailaddress_set.get(primary=True)
        return primary_email.verified
    
    # logic update data 
    def update(self, instance, validated_data):
        print(validated_data)
        # Memisahkan data milik profile, isi dengan {} jika profile tidak ditemukan
        profile_data = validated_data.pop('profile', {})
        
        # update models User
        instance = super().update(instance, validated_data)
        
        if profile_data:
            # Ambil models profile dari models User
            profile = instance.profile
            
            # update models Profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
            
        return instance
