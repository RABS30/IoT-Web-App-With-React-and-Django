import os
from django.db import models
from django.contrib.auth.models import User

# 1. Buat fungsi untuk mengatur nama file
def upload_to_profile_directory(instance, filename):
    # Ambil ekstensi file
    extension = filename.split('.')[-1]
    # Buat nama baru
    new_filename = f"profil_{instance.user.email}.{extension}"
    # Kembalikan jalur lengkap
    return os.path.join('static/profile_picture/', new_filename)   



class UserProfileModel(models.Model):
    user        = models.OneToOneField(User, verbose_name=("User"), on_delete=models.CASCADE, related_name='profile')
    avatar      = models.ImageField(upload_to=upload_to_profile_directory, blank=True, null=True)
    created_at  = models.DateTimeField(auto_now_add=True)



     


    
    def __str__(self):
        return f'{self.user.email}'





























































































