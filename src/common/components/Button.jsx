import { Button } from "@mui/material";

export const CommonButton = (props) => {
  const {label, sx, ...rest} = props;
  return (
    <Button
      variant="contained"
      {...rest}
      sx={{
        backgroundColor: "#3f51b5",
        color: "#fff",
        textTransform: 'uppercase',

        '&:hover': {
          backgroundColor: "#22378a",
        },

        ...sx,
      }}
    >
      {label}
    </Button>
  )
}

export default CommonButton;
