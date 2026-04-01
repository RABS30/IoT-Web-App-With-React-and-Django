from django.apps import AppConfig


class AuthenticateConfig(AppConfig):
    name = 'authentication'
    
    def ready(self):
        import authentication.signals
        
