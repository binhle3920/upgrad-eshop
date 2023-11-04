import { Box, Stack, Typography, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CommonButton from "../../common/components/Button";
import Footer from "../../common/components/Footer";
import { useState } from "react";

const SignUpScreen = () => {
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    const psw = e.target.value;
    const isValid = psw.length >= 6 && psw.length <= 40;

    if (psw.length === 0) {
      setPassword(psw);
      setIsValidPassword(true);
      return;
    }

    setPassword(psw);
    setIsValidPassword(isValid);
  }

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    const isValid = confirmPassword.length >= 6 && confirmPassword.length <= 40 && confirmPassword === password;

    if (confirmPassword.length === 0) {
      setIsValidConfirmPassword(true);
      return;
    }

    setIsValidConfirmPassword(isValid);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
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
          Sign up
        </Typography>

        <form onSubmit={handleSubmit} style={{
          width: '100%',
        }}>
          <Stack direction="column" spacing={2} width="100%">
            <TextField id="firstName" label="First Name" variant="outlined" type="text" required maxLength={255} />
            <TextField id="lastName" label="Last Name" variant="outlined" type="text" required maxLength={255} />
            <TextField id="email" label="Email Address" variant="outlined" type="email" required maxLength={50} />
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
            <TextField
              id="confirm"
              label="Confirm Password"
              variant="outlined"
              type="password"
              required
              error={!isValidConfirmPassword}
              helperText={!isValidConfirmPassword && "Password must be between 6 to 40 characters and match with password"}
              onChange={handleConfirmPasswordChange}
            />

            <TextField id="contactNumber" label="Contact Number" variant="outlined" type="string" required maxLength={255} />

            <Stack pt={2}>
              <CommonButton label="Sign Up" type="submit" />
            </Stack>
          </Stack>
        </form>

        <Typography noWrap component="a" variant="subtitle1" href="/login" width="100%" color="#994696" align="right" sx={{
          textDecoration: "underline",
        }}>
          Already have an account? Sign In
        </Typography>

        <Box pt={4}>
          <Footer />
        </Box>
      </Stack>
    </Stack>
  )
}

export default SignUpScreen;
