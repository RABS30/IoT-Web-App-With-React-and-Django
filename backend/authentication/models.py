import os
from django.db import models
from django.contrib.auth.models import User
from allauth.socialaccount.models import SocialAccount

# 1. Buat fungsi untuk mengatur nama file
def upload_to_profile_directory(instance, filename):
    # Ambil ekstensi file
    extension = filename.split('.')[-1]
    # Buat nama baru
    new_filename = f"profil_{instance.user.email}.{extension}"
    # Kembalikan jalur lengkap
    return os.path.join('profile_picture/', new_filename)   



class UserProfileModel(models.Model):
    user        = models.OneToOneField(User, verbose_name=("User"), on_delete=models.CASCADE, related_name='profile')
    avatar      = models.ImageField(upload_to=upload_to_profile_directory, blank=True, null=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.email}'
    
    @property
    def get_avatar_url(self):
        if self.avatar:
            return f'http://localhost:8000{self.avatar.url}'

        if SocialAccount.objects.filter(user=self.user).exists() :
            social  = self.user.socialaccount_set.get(provider='google')
            picture = social.extra_data.get('picture')
            return picture

        return ''

        




























































































