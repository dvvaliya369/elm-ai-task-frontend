import React, { useState } from "react";
import StandaloneLoginPage from "./standalone-login";
import ResetPasswordRequest from "./reset-password-request";
import ResetPasswordForm from "./reset-password-form";

// Main App component that demonstrates the complete authentication flow
const AuthenticationDemo = () => {
  const [currentView, setCurrentView] = useState<"login" | "reset-request" | "reset-form" | "success">("login");
  const [resetToken, setResetToken] = useState<string>("");

  const handleShowResetRequest = () => {
    setCurrentView("reset-request");
  };

  const handleShowResetForm = (token?: string) => {
    setResetToken(token || "demo-token-123");
    setCurrentView("reset-form");
  };

  const handleBackToLogin = () => {
    setCurrentView("login");
    setResetToken("");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "reset-request":
        return (
          <ResetPasswordRequest 
            onBackToLogin={handleBackToLogin}
          />
        );
      case "reset-form":
        return (
          <ResetPasswordForm 
            onBackToLogin={handleBackToLogin}
            token={resetToken}
          />
        );
      default:
        return (
          <StandaloneLoginPage />
        );
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {renderCurrentView()}
      
      {/* Demo Navigation Controls - Remove in production */}
      <div style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "rgba(255, 255, 255, 0.9)",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        minWidth: "200px"
      }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "600" }}>
          Demo Navigation
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={handleBackToLogin}
            disabled={currentView === "login"}
            style={{
              padding: "8px 12px",
              fontSize: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              background: currentView === "login" ? "#f5f5f5" : "white",
              cursor: currentView === "login" ? "not-allowed" : "pointer"
            }}
          >
            Login Page
          </button>
          <button
            onClick={handleShowResetRequest}
            disabled={currentView === "reset-request"}
            style={{
              padding: "8px 12px",
              fontSize: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              background: currentView === "reset-request" ? "#f5f5f5" : "white",
              cursor: currentView === "reset-request" ? "not-allowed" : "pointer"
            }}
          >
            Reset Request
          </button>
          <button
            onClick={() => handleShowResetForm()}
            disabled={currentView === "reset-form"}
            style={{
              padding: "8px 12px",
              fontSize: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              background: currentView === "reset-form" ? "#f5f5f5" : "white",
              cursor: currentView === "reset-form" ? "not-allowed" : "pointer"
            }}
          >
            Reset Form
          </button>
        </div>
        <p style={{ 
          margin: "12px 0 0 0", 
          fontSize: "10px", 
          color: "#666",
          lineHeight: "1.4"
        }}>
          Use these buttons to navigate between different states of the authentication flow.
        </p>
      </div>
    </div>
  );
};

export default AuthenticationDemo;
