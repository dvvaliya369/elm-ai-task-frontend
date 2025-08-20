import React, { useEffect } from "react";
import RouteLoader from "../components/RouteLoader";
import { initializeAuth } from "../store/authSlice";
import { useDispatch, useSelector } from "../store/index";

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (!isInitialized) {
    return <RouteLoader />;
  }

  return <>{children}</>;
};

export default AuthInitializer;
