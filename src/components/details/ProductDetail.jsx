import { Chip, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ROUTES } from "../../utils/constants";
import { getProduct } from "../../api/product";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../context/snackbar/snackbar-context";
import CommonButton from "../../common/components/Button";

const ProductDetailScreen = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {showNotification} = useSnackbar();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    getProduct(id).then(async (response) => {
      if (response.status !== 200) {
        showNotification({
          message: 'Cannot fetch product details!',
          severity: 'error'
        })
        navigate(ROUTES.HOME);
      }

      setProduct(await response.json());
    }).catch((error) => {
      showNotification({
        message: 'Cannot fetch product details!',
        severity: 'error'
      })
      navigate(ROUTES.HOME);
    });
  }, [navigate, id, showNotification]);

  if (!product) {
    return (
      <Stack width="100%" justifyContent="center" alignItems="center" mt={20}>
        <CircularProgress/>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={10} mt={20} justifyContent="center" alignItems="flex-start">
      <Stack>
        <img src={product.imageUrl || "https://www.rallis.com/Upload/Images/thumbnail/Product-inside.png"} width="500"
             alt={product.name}/>
      </Stack>

      <Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h4">{product.name}</Typography>
          <Chip
            label={`Available Quantity: ${product.availableItems}`}
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white'
            }}
          />
        </Stack>

        <Typography mt={1}>
          Category: <Typography component="span" fontWeight="bold">{product.category}</Typography>
        </Typography>

        <Typography fontStyle="italic" mt={3}>{product.description}</Typography>
        <Typography variant="h5" color="red" mt={3}>₹ {product.price}</Typography>

        <TextField
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          id="quantity"
          label="Enter Quantity"
          variant="outlined"
          required
          type="number"
          sx={{mt: 4}}
          InputProps={{inputProps: {min: 0}}}
        />

        <CommonButton
          label="Place Order"
          disabled={!quantity || quantity > product.availableItems}
          sx={{mt: 4, width: 'fit-content'}}
          onClick={() => navigate(`${ROUTES.ORDER}?productId=${product.id}&quantity=${quantity}`)}
        />
      </Stack>
    </Stack>
  );
}

export default ProductDetailScreen;
