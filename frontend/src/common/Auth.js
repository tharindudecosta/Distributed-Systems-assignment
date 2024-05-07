import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // import dependency

const Auth = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    var user = localStorage.getItem("user");
    var token = localStorage.getItem("token");

    // const decodedToken = jwtDecode(token);
    

    setTimeout(() => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    }, 2000);
  }, []);

  if (currentUser === undefined) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Auth;
