import React from 'react';
import LoginForm from '../components/auth/LoginForm';

function LoginPage() {
  return (
    <main className="auth-page">
      <img
        className="hero-konoha-watermark"
        src="/assets/image/konohaL.png"
        alt=""
        aria-hidden="true"
      />
      <LoginForm />
    </main>
  );
}

export default LoginPage;
