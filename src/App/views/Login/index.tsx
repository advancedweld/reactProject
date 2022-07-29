import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Login() {
  const location = useLocation();
  useEffect(() => {
    console.log("@@location in login is -----", location);
  });
  return (
    <div className="login">
      <h1> login </h1>
    </div>
  );
}

export default Login;
