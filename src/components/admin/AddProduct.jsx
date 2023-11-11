import { useState } from "react";
import { AUTO_CLOSE_NOTIFICATIONS_DURATION } from "../../utils/constants";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CommonButton from "../../common/components/Button";
import { addProduct } from "../../api/product";

const CATEGORY_OPTIONS = {
  APPAREL: 'Apparel',
  ELECTRONICS: 'Electronics',
  PERSONAL_CARE: 'Personal Care',
};

const AddProductScreen = () => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(CATEGORY_OPTIONS.APPAREL);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name: e.target.name.value,
      category: category,
      manufacturer: e.target.manufacturer.value,
      availableItems: e.target.availableItems.value,
      price: e.target.price.value,
      imageUrl: e.target.imageUrl.value,
      description: e.target.description.value,
    }

    const response = await addProduct(product);

    if (response.status === 201) {
      setMessage({
        severity: 'success',
        message: `Product ${product.name} added successfully`
      })
    } else {
      setMessage({
        severity: 'error',
        message: `Error adding product ${product.name}`
      })
    }

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
          Add Product
        </Typography>

        <form onSubmit={handleSubmit} style={{
          width: '100%',
        }}>
          <Stack direction="column" spacing={2} width="100%">
            <TextField id="name" label="Name" variant="outlined" type="text" required maxLength={255} />

            <FormControl id="category">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                label="Category"
                onChange={handleCategoryChange}
                value={category}
              >
                <MenuItem value={CATEGORY_OPTIONS.APPAREL}>Apparel</MenuItem>
                <MenuItem value={CATEGORY_OPTIONS.ELECTRONICS}>Electronics</MenuItem>
                <MenuItem value={CATEGORY_OPTIONS.PERSONAL_CARE}>Personal Care</MenuItem>
              </Select>
            </FormControl>
            <TextField id="manufacturer" label="Manufacturer" variant="outlined" type="text" required maxLength={255} />
            <TextField id="availableItems" label="Available Items" variant="outlined" type="number" required />
            <TextField id="price" label="Price" variant="outlined" type="number" required />
            <TextField id="imageUrl" label="Image" variant="outlined" type="url" maxLength={255} />
            <TextField id="description" label="Description" variant="outlined" type="text" />

            <Stack pt={2}>
              <CommonButton label="Save Product" type="submit" />
            </Stack>
          </Stack>
        </form>
      </Stack>

      <Snackbar
        anchorOrigin={{ vertical: 'top',  horizontal: 'right' }}
        open={isOpenSnackbar}
        onClose={() => setIsOpenSnackbar(false)}
        autoHideDuration={AUTO_CLOSE_NOTIFICATIONS_DURATION}
      >
        <Alert onClose={() => setIsOpenSnackbar(false)} severity={message?.severity}>
          {message?.message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default AddProductScreen;
