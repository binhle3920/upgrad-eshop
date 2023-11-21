import { SnackbarContext, useSnackbarProvider } from "./snackbar-context";

const SnackbarProvider = (props) => {
  const {children} = props;

  const snackbar = useSnackbarProvider();

  return <SnackbarContext.Provider value={snackbar}>{children}</SnackbarContext.Provider>;
};

export default SnackbarProvider;
