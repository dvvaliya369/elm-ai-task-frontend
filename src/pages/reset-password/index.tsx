import React, { useState, useCallback, memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { validateForm } from '../../utils/validation';
import type { AuthFormField } from '../../components/AuthForm/authForm.interface';
import { resetPassword } from '../../service/auth.service';
import { useDispatch } from '../../store/index';
import { useToast } from '../../hooks/useToast';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams<{ token: string }>();
  const { showSuccess, showError } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      showError('Invalid or missing reset token');
      navigate('/log-in');
    }
  }, [token, navigate, showError]);

  useEffect(() => {
    if (resetSuccess) {
      showSuccess('Password reset successfully! Please sign in with your new password.');
      navigate('/log-in');
      setResetSuccess(false);
    }
  }, [resetSuccess, navigate, showSuccess]);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  }, [errors.password]);

  const handleConfirmPasswordChange = useCallback((value: string) => {
    setConfirmPassword(value);
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  }, [errors.confirmPassword]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm({ password, confirmPassword });
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    if (!token) {
      showError('Invalid reset token');
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(resetPassword({ token, newPassword: password }));
      if (resetPassword.fulfilled.match(result)) {
        setResetSuccess(true);
      } else if (resetPassword.rejected.match(result)) {
        showError(result.payload as string || 'Failed to reset password');
      }
    } catch(error) {
      console.error('Reset password error:', error);
      showError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [dispatch, password, token, showError]);

  const handleBackToLogin = useCallback(() => {
    navigate('/log-in');
  }, [navigate]);

  const fields: AuthFormField[] = [
    {
      name: 'password',
      label: 'New Password',
      type: 'password',
      value: password,
      onChange: handlePasswordChange,
      required: true,
      error: errors.password,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm New Password',
      type: 'password',
      value: confirmPassword,
      onChange: handleConfirmPasswordChange,
      required: true,
      error: errors.confirmPassword,
    },
  ];

  return (
    <AuthForm
      title="Reset Password"
      subtitle="Enter your new password below."
      fields={fields}
      submitText="Reset Password"
      onSubmit={handleSubmit}
      footerText="Remember your password?"
      footerLinkText="Back to Sign In"
      onFooterLinkClick={handleBackToLogin}
      isLoading={loading}
    />
  );
};

ResetPassword.displayName = 'ResetPassword';

export default memo(ResetPassword);
