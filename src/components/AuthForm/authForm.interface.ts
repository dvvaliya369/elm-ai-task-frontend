export interface AuthFormField {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

export interface AuthFormProps {
  title: string;
  subtitle: string;
  fields: AuthFormField[];
  submitText: string;
  onSubmit: (e: React.FormEvent) => void;
  footerText: string;
  footerLinkText: string;
  onFooterLinkClick: () => void;
  isLoading?: boolean;
}