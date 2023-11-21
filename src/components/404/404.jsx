import { Box, Typography } from "@mui/material";

const NotFoundScreen = () => {
  return (
    <Box sx={{
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Typography variant="h1">404 Not Found</Typography>
      <Typography variant="subtitle1">The page you are looking for does not exist, or you do not have permission to
        access it.</Typography>
    </Box>
  )
}

export default NotFoundScreen;
