import {useState, createContext, useContext} from "react";
import {login} from "../../api/auth";

export const AuthContext = createContext(undefined);

export const useAuthProvider = (history, location) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const userLogin = (email, password) =>
    login(email, password)
      .then(user => {
        console.log('👨‍💻 user logged in');
        setUser(user);
        setError(null);
      })
      .catch(error => setError(error));

  const userLogout = () => {
    console.log('😭 user logged out');
    setUser(null);
    setError(null);
  };

  return {
    error,
    user,
    login: userLogin,
    logout: userLogout
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a provider');
  }

  return context;
};
