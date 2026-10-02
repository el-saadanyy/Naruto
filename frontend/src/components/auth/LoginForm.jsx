import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuth } from '../../context/AuthContext.jsx';

function LoginForm() {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      );
    },
    { scope: cardRef }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login manga-panel" ref={cardRef}>
      <div className="auth-header">
        <i className="fa-solid fa-user-ninja"></i>
        <h1 className="auth-title">Shinobi Portal • 忍ポータル</h1>
        <p className="auth-subtitle">
          Enter your shinobi credentials to access the Hidden Archives
        </p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {errorMessage && (
          <div
            className="auth-error-banner"
            role="alert"
            style={{
              backgroundColor: 'rgba(153, 27, 27, 0.25)',
              border: '1px solid var(--primary-crimson-bright, #dc2626)',
              borderRadius: '6px',
              padding: '10px 14px',
              marginBottom: '16px',
              color: '#fecaca',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
            }}
          >
            <i className="fa-solid fa-triangle-exclamation" style={{ color: '#f87171' }}></i>
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">Shinobi Handle / Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Obito .. Is That You ?!"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={submitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Secret Seal / Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="This type Of Genjutsu Does Not Work On Me"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={submitting}
          />
        </div>
        <div className="submit-wrap">
          <input
            type="submit"
            value={submitting ? 'Authenticating... • 認証中' : 'Authenticate • 認証'}
            disabled={submitting}
            style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}
          />
        </div>
        <div className="or">OR</div>
        <div className="do-not-acc">
          <nav>
            Not yet registered in the ninja registry? <Link to="/signup">Sign Up</Link>
          </nav>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
