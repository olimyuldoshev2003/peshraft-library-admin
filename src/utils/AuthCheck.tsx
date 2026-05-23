import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCheck = ({ children }: any) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  return children;
};

export default AuthCheck;
