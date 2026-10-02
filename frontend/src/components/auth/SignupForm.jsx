import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuth } from '../../context/AuthContext.jsx';

function SignupForm() {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Secret seals / passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      await signup(formData);
      navigate('/');
    } catch (err) {
      setErrorMessage(err.message || 'Enrollment failed. Please verify the information.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-card manga-panel" ref={cardRef}>
      <div className="auth-header">
        <i className="fa-solid fa-scroll"></i>
        <h1 className="auth-title">Shinobi Registry • 忍者登録所</h1>
        <p className="auth-subtitle">
          Enroll in the official Konoha ninja archive and begin your shinobi journey
        </p>
      </div>

      <form className="login-form auth-form" onSubmit={handleSubmit}>
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
          <label htmlFor="reg-username">Shinobi Name / Handle</label>
          <input
            id="reg-username"
            type="text"
            name="username"
            placeholder="e.g. Uzumaki Naruto"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={submitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-email">Ninja Registry Email</label>
          <input
            id="reg-email"
            type="email"
            name="email"
            placeholder="ninja@konoha.leaf"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={submitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-password">Secret Seal / Password</label>
          <input
            id="reg-password"
            type="password"
            name="password"
            placeholder="Enter your secret seal"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={submitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-confirm-password">Confirm Secret Seal</label>
          <input
            id="reg-confirm-password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your secret seal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={submitting}
          />
        </div>
        <div className="submit-wrap">
          <input
            type="submit"
            value={submitting ? 'Enrolling in Registry... • 登録中' : 'Enroll in Registry • 登録'}
            disabled={submitting}
            style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}
          />
        </div>
        <div className="or">OR</div>
        <div className="do-not-acc">
          <nav>
            Already have a registered ninja identity? <Link to="/login">Log In</Link>
          </nav>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
