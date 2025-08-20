import React, { useState, useCallback, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { validateForm } from '../../utils/validation';
import type { AuthFormField } from '../../components/AuthForm/authForm.interface';
import { signupUser } from '../../service/auth.service';
import { useSelector, useDispatch } from '../../store/index';
import { useToast } from '../../hooks/useToast';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { showSuccess, showError } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    if (signupSuccess) {
      showSuccess('Account created successfully! Please sign in.');
      navigate('/log-in');
      setSignupSuccess(false);
    }
  }, [signupSuccess, navigate, showSuccess]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);

  const handleFirstNameChange = useCallback((value: string) => {
    setFirstName(value);
    if (errors.firstName) {
      setErrors(prev => ({ ...prev, firstName: '' }));
    }
  }, [errors.firstName]);

  const handleLastNameChange = useCallback((value: string) => {
    setLastName(value);
    if (errors.lastName) {
      setErrors(prev => ({ ...prev, lastName: '' }));
    }
  }, [errors.lastName]);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  }, [errors.email]);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  }, [errors.password]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm({ firstName, lastName, email, password });
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    try {
      const result = await dispatch(signupUser({ firstName, lastName, email, password }));
      if (signupUser.fulfilled.match(result)) {
        setSignupSuccess(true);
      }
    } catch(error) {
      console.error('Signup error:', error);
    }
  }, [dispatch, firstName, lastName, email, password]);

  const handleLoginClick = useCallback(() => {
    navigate('/log-in');
  }, [navigate]);

  const fields: AuthFormField[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      value: firstName,
      onChange: handleFirstNameChange,
      required: true,
      error: errors.firstName,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      value: lastName,
      onChange: handleLastNameChange,
      required: true,
      error: errors.lastName,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      value: email,
      onChange: handleEmailChange,
      required: true,
      error: errors.email,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: password,
      onChange: handlePasswordChange,
      required: true,
      error: errors.password,
    },
  ];

  return (
    <AuthForm
      title="Sign Up"
      subtitle="Create your account to get started."
      fields={fields}
      submitText="Sign Up"
      onSubmit={handleSubmit}
      footerText="Already have an account?"
      footerLinkText="Sign in"
      onFooterLinkClick={handleLoginClick}
      isLoading={loading}
    />
  );
};

Signup.displayName = 'Signup';

export default memo(Signup);