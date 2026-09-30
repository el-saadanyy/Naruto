import React from 'react';
import SignupForm from '../components/auth/SignupForm';

function SignupPage() {
  return (
    <main className="auth-page">
      <img
        className="hero-konoha-watermark"
        src="/assets/image/konohaL.png"
        alt=""
        aria-hidden="true"
      />
      <SignupForm />
    </main>
  );
}

export default SignupPage;
