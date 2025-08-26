import {
  CloseOutlined as CloseIcon,
  EditOutlined as EditIcon,
  SaveOutlined as SaveIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { changePassword } from "../../service/auth.service";
import { useDispatch, useSelector } from "../../store";
import PasswordField from "./PasswordField";
import { changePasswordStyles } from "./styles";

const ChangePassword: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { showSuccess, showError } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditToggle = useCallback(() => {
    if (isEditing) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setIsEditing(!isEditing);
  }, [isEditing]);

  const handleSubmit = useCallback(async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      showError("New password must be at least 6 characters long");
      return;
    }

    try {
      const result = await dispatch(
        changePassword({ oldPassword, newPassword })
      );

      if (changePassword.fulfilled.match(result)) {
        showSuccess("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsEditing(false);
      } else {
        showError(result.payload as string);
      }
    } catch {
      showError("Failed to change password");
    }
  }, [
    oldPassword,
    newPassword,
    confirmPassword,
    dispatch,
    showSuccess,
    showError,
  ]);

  return (
    <Card sx={changePasswordStyles.card}>
      <Box sx={changePasswordStyles.header}>
        <Typography variant="h6" sx={changePasswordStyles.title}>
          Change Password
        </Typography>
        {!isEditing && (
          <Button
            variant="outlined"
            onClick={handleEditToggle}
            startIcon={<EditIcon />}
            size="small"
          >
            Edit
          </Button>
        )}
      </Box>

      {isEditing ? (
        <Box sx={changePasswordStyles.formContainer}>
          <PasswordField
            label="Current Password"
            value={oldPassword}
            onChange={setOldPassword}
          />

          <PasswordField
            label="New Password"
            value={newPassword}
            onChange={setNewPassword}
          />

          <PasswordField
            label="Confirm New Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <Box sx={changePasswordStyles.buttonContainer}>
            <Button
              variant="outlined"
              onClick={handleEditToggle}
              startIcon={<CloseIcon />}
              disabled={loading}
              size="small"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              startIcon={<SaveIcon />}
              disabled={loading}
              size="small"
            >
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </Box>
        </Box>
      ) : null}
    </Card>
  );
};

export default ChangePassword;
