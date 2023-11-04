import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Typography>
      Copyright &copy;{' '}
      <Typography component="a" href="https://www.upgrad.com" color="#994696" target="_blank" sx={{
        textDecoration: "underline",
      }}>
        upGrad
      </Typography>
      {' '}2021
    </Typography>
  );
}

export default Footer;
