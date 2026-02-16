export interface GoogleAuthButtonProps {
  onSuccess: (tokenResponse: { access_token: string }) => void;
  onError?: () => void;
  disabled?: boolean;
  text?: string;
}
