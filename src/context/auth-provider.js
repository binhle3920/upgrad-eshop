import { useAuthProvider, AuthContext } from "./auth-context";

const AuthProvider = (props) => {
  const { children } = props;

  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;