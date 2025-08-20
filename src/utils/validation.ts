export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return '';
};

export const validateName = (name: string, fieldName: string): string => {
  if (!name.trim()) {
    return `${fieldName} is required`;
  }
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }
  return '';
};

export const validateForm = (fields: Record<string, string>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (fields.email !== undefined) {
    errors.email = validateEmail(fields.email);
  }

  if (fields.password !== undefined) {
    errors.password = validatePassword(fields.password);
  }

  if (fields.firstName !== undefined) {
    errors.firstName = validateName(fields.firstName, 'First name');
  }

  if (fields.lastName !== undefined) {
    errors.lastName = validateName(fields.lastName, 'Last name');
  }

  Object.keys(errors).forEach(key => {
    if (!errors[key]) {
      delete errors[key];
    }
  });

  return errors;
};
