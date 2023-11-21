import { createContext, useContext, useState } from "react";

export const SnackbarContext = createContext(undefined);

export const useSnackbarProvider = () => {
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const showNotification = (message) => {
    setMessage(message);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return {
    message,
    open,
    showNotification,
    handleClose
  }
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a provider');
  }

  return context;
};
