import {useState, createContext, useContext} from "react";
import { login, signUp } from "../../api/auth";

export const AuthContext = createContext(undefined);

export const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const userLogin = async ({username, password}) => {
    try {
      const response = await login({username, password})

      if (response.status === 401) {
        return {
          message: 'Invalid username or password',
          severity: 'error'
        }
      }

      if (response.status === 200) {
        const { token } = await response.json();
        setAccessToken(token);
        return {
          message: 'Login successful',
          severity: 'success'
        }
      }
    } catch (error) {
      console.log('😭 user logged in error', error);

      return {
        message: 'Something went wrong. Please try again.',
        severity: 'error'
      }
    }
  }

  const userSignup = async ({ firstName, lastName, email, contactNumber, password }) => {
    try {
      const response = await signUp({firstName, lastName, email, contactNumber, password})
      const isSuccessful = response.status === 200;
      const { message } = await response.json();

      return {
        message,
        severity: isSuccessful ? 'success' : 'error'
      }
    } catch (error) {
      console.log('😭 user signed up error', error);
      return {
        message: 'Something went wrong. Please try again.',
        severity: 'error'
      }
    }
  }

  const userLogout = () => {
    console.log('😭 user logged out');
    setUser(null);
  };

  return {
    user,
    login: userLogin,
    signup: userSignup,
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
