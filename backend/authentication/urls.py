from django.urls import path
from .views import GoogleLogin

from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView, PasswordChangeView, PasswordResetView, PasswordResetConfirmView
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ResendEmailVerificationView

from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns = [
    # Detail user data 
    path('user/',   UserDetailsView.as_view(),  name='user_detail'),
    
    # Google Authentication
    path('google/', GoogleLogin.as_view(),  name='google_login'),
    
    # Manual Authentication
    path('login/',  LoginView.as_view(),    name='login'),
    path('logout/', LogoutView.as_view(),   name='logout'),

    # Manual Registration
    path('register/',               RegisterView.as_view(),                  name='register'),
    path('register/verify-email/',  VerifyEmailView.as_view(),               name='verify_email'),
    path('register/resend-email/',  ResendEmailVerificationView.as_view(),   name='resend_email'),
    
    # Password Management
    path('password/change/',        PasswordChangeView.as_view(),       name='password_change'),
    path('password/reset/',         PasswordResetView.as_view(),        name='password_reset'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
    
    # Token Management
    path('token/verify/',   TokenVerifyView.as_view(),      name='verify_jwt'),
    path('token/refresh/',  get_refresh_view().as_view(),   name='refresh_jwt'),
]