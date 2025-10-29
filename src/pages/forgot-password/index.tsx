import React, { useState, useCallback, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { validateForm } from '../../utils/validation';
import type { AuthFormField } from '../../components/AuthForm/authForm.interface';
import { forgotPassword } from '../../service/auth.service';
import { useDispatch } from '../../store/index';
import { useToast } from '../../hooks/useToast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  useEffect(() => {
    if (requestSuccess) {
      showSuccess('Password reset link has been sent to your email!');
      navigate('/log-in');
      setRequestSuccess(false);
    }
  }, [requestSuccess, navigate, showSuccess]);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  }, [errors.email]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm({ email });
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(forgotPassword({ email }));
      if (forgotPassword.fulfilled.match(result)) {
        setRequestSuccess(true);
      } else if (forgotPassword.rejected.match(result)) {
        showError(result.payload as string || 'Failed to send reset link');
      }
    } catch(error) {
      console.error('Forgot password error:', error);
      showError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [dispatch, email, showError]);

  const handleBackToLogin = useCallback(() => {
    navigate('/log-in');
  }, [navigate]);

  const fields: AuthFormField[] = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      value: email,
      onChange: handleEmailChange,
      required: true,
      error: errors.email,
    },
  ];

  return (
    <AuthForm
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you a link to reset your password."
      fields={fields}
      submitText="Send Reset Link"
      onSubmit={handleSubmit}
      footerText="Remember your password?"
      footerLinkText="Back to Sign In"
      onFooterLinkClick={handleBackToLogin}
      isLoading={loading}
    />
  );
};

ForgotPassword.displayName = 'ForgotPassword';

export default memo(ForgotPassword);
