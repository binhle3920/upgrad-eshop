import {useState, createContext, useContext} from "react";

export const AuthContext = createContext(undefined);

export const useAuthProvider = (history, location) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = (email, password) =>
    login(email, password)
      .then(user => {
        setUser(user);
        setError(null);
      })
      .catch(error => setError(error));

  const logOut = () => {
    setUser(null);
    setError(null);
  };

  return {
    error, user, login, logOut
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a provider');
  }

  return context;
};
