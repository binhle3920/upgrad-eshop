import { Box, Stack, Typography, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CommonButton from "../../common/components/Button";
import Footer from "../../common/components/Footer";

const LoginScreen = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('submit', e.target.username.value, e.target.password.value);
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
          Sign In
        </Typography>

        <form onSubmit={handleSubmit} style={{
          width: '100%',
        }}>
          <Stack direction="column" spacing={2} width="100%">
            <TextField id="username" label="Email Address" variant="outlined" type="email" />
            <TextField id="password" label="Password" variant="outlined" type="password" />

            <Stack pt={2}>
              <CommonButton label="Sign In" type="submit" />
            </Stack>
          </Stack>
        </form>

        <Typography noWrap component="a" variant="subtitle1" href="/signup" width="100%" color="#994696" sx={{
          textDecoration: "underline",
        }}>
          Don't have an account? Sign Up
        </Typography>

        <Box pt={4}>
          <Footer />
        </Box>
      </Stack>
    </Stack>
  )
}

export default LoginScreen;
