import { useSnackbar } from "../../context/snackbar/snackbar-context";
import { AUTO_CLOSE_NOTIFICATIONS_DURATION } from "../../utils/constants";
import { Alert, Snackbar } from "@mui/material";

const CustomSnackbar = () => {
  const {message, open, handleClose} = useSnackbar();

  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      onClose={handleClose}
      open={open}
      autoHideDuration={AUTO_CLOSE_NOTIFICATIONS_DURATION}
    >
      <Alert severity={message?.severity} onClose={handleClose}>
        {message?.message}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbar;
