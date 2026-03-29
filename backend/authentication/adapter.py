from allauth.account.adapter import DefaultAccountAdapter

class AccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        return f'http://localhost:5173/confirm-email/{emailconfirmation.key}'
        
    def respond_email_verification_sent(self, request, user):
        return None