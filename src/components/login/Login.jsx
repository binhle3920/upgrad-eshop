import { Box, Stack, Typography, TextField, Alert, Snackbar } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CommonButton from "../../common/components/Button";
import Footer from "../../common/components/Footer";
import { useEffect, useState } from "react";
import { AUTO_CLOSE_NOTIFICATIONS_DURATION, ROUTES } from "../../utils/constants";
import { useAuth } from "../../context/auth/auth-context";
import { Link, useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);

  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.HOME);
    }
  }, [user, navigate]);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const isValid = password.length >= 6 && password.length <= 40;

    if (password.length === 0) {
      setIsValidPassword(true);
      return;
    }

    setIsValidPassword(isValid);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const response = await login({username, password});
    setLoginMessage(response);
    setIsOpenSnackbar(true);
  }

  return (
    <Stack justifyContent="center" alignItems="center">
      <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" mt={10} width={400}>
        <Stack p={1} alignItems="center" bgcolor="#f60157" borderRadius="50%">
          <LockOutlinedIcon sx={{
            color: '#ffffff'
          }} fontSize="large" />
        </Stack>

        <Typography variant="h4" pb={2}>
          Sign in
        </Typography>

        <form onSubmit={handleSubmit} style={{
          width: '100%',
        }}>
          <Stack direction="column" spacing={2} width="100%">
            <TextField id="username" label="Email Address" variant="outlined" type="email" required />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              required
              error={!isValidPassword}
              helperText={!isValidPassword && "Password must be between 6 to 40 characters"}
              onChange={handlePasswordChange}
            />

            <Stack pt={2}>
              <CommonButton label="Sign In" type="submit" />
            </Stack>
          </Stack>
        </form>

        <Link to={ROUTES.SIGNUP}>
          <Typography noWrap variant="subtitle1" width="100%" color="#994696" sx={{
            textDecoration: "underline",
          }}>
            Don't have an account? Sign Up
          </Typography>
        </Link>

        <Box pt={4}>
          <Footer />
        </Box>
      </Stack>

      <Snackbar
        anchorOrigin={{ vertical: 'top',  horizontal: 'right' }}
        open={isOpenSnackbar}
        onClose={() => setIsOpenSnackbar(false)}
        autoHideDuration={AUTO_CLOSE_NOTIFICATIONS_DURATION}
      >
        <Alert onClose={() => setIsOpenSnackbar(false)} severity={loginMessage?.severity}>
          {loginMessage?.message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default LoginScreen;
