import React, { memo } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

interface GoogleAuthButtonProps {
  onSuccess: (tokenResponse: { access_token: string }) => void;
  onError?: () => void;
  disabled?: boolean;
  text?: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onSuccess,
  onError,
  disabled = false,
  text = "Continue with Google",
}) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      onSuccess(tokenResponse as { access_token: string });
    },
    onError: () => {
      if (onError) {
        onError();
      }
    },
  });

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={() => login()}
      disabled={disabled}
      startIcon={<GoogleIcon />}
      sx={{
        textTransform: "none",
        borderColor: "divider",
        color: "text.primary",
        py: 1.5,
        "&:hover": {
          borderColor: "primary.main",
          backgroundColor: "action.hover",
        },
      }}
    >
      {text}
    </Button>
  );
};

GoogleAuthButton.displayName = "GoogleAuthButton";

export default memo(GoogleAuthButton);
