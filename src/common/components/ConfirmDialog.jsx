import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const ConfirmDialog = ({ open, onClose, title, description, onSubmit }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>OK</Button>
        <Button onClick={onClose} autoFocus>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog;
