from allauth.account.adapter import DefaultAccountAdapter

class AccountAdapter(DefaultAccountAdapter):
    # Mengubah URLs yang digunakan untuk konfirmasi verifikasi email yang dikirim di email
    def get_email_confirmation_url(self, request, emailconfirmation):
        return f'http://localhost/confirm-email/{emailconfirmation.key}/'
        
    # Mengubah URLs redirect saat berhasil membuat akun baru menjadi None (tidak redirect kemanapun)
    def respond_email_verification_sent(self, request, user):
        return None