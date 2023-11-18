import { Divider, Paper, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const PlaceOrderStep = ({ address, product }) => {
  const [searchParams] = useSearchParams();
  const quantity = searchParams.get('quantity');

  return (
    <Paper elevation={4} sx={{ width: '90%' }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="column" spacing={2} py={5} width="60%" px={2}>
          <Typography variant="h4">{product.name}</Typography>
          <Typography>Quantity: <Typography component="span" fontWeight="bold">{quantity}</Typography></Typography>
          <Typography>Category: <Typography component="span" fontWeight="bold">{product.category}</Typography></Typography>
          <Typography fontStyle="italic" pt={2}>{product.description}</Typography>
          <Typography variant="h5" color="red">Total Price: ₹ {product.price}</Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack direction="column" spacing={1} width="40%" py={5} px={2}>
          <Typography variant="h4">Address Detail</Typography>
          <Typography>{address.name}</Typography>
          <Typography>Contact Number: {address.contactNumber}</Typography>
          <Typography>{address.street}, {address.city}</Typography>
          <Typography>{address.state}</Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default PlaceOrderStep;
