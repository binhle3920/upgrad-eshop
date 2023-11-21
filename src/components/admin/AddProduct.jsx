import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import CommonButton from "../../common/components/Button";
import { useProducts } from "../../context/products/products-context";
import { useSnackbar } from "../../context/snackbar/snackbar-context";
import { CATEGORY_OPTIONS } from "../../utils/constants";

const AddProductScreen = () => {
  const [category, setCategory] = useState(CATEGORY_OPTIONS.APPAREL);

  const {addProduct} = useProducts();
  const {showNotification} = useSnackbar();

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
    showNotification(response);

    if (response.severity === 'success') {
      e.target.reset();
      setCategory(CATEGORY_OPTIONS.APPAREL);
    }
  }

  return (
    <Stack justifyContent="center" alignItems="center">
      <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" mt={10} width={400}>
        <Typography variant="h4" pb={2}>
          Add Product
        </Typography>

        <form onSubmit={handleSubmit} style={{
          width: '100%',
        }}>
          <Stack direction="column" spacing={2} width="100%">
            <TextField id="name" label="Name" variant="outlined" type="text" required maxLength={255}/>

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
            <TextField id="manufacturer" label="Manufacturer" variant="outlined" type="text" required maxLength={255}/>
            <TextField
              id="availableItems"
              label="Available Items"
              variant="outlined"
              type="number"
              InputProps={{inputProps: {min: 0}}}
              required/>
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              type="number"
              InputProps={{inputProps: {min: 0}}}
              required/>
            <TextField id="imageUrl" label="Image" variant="outlined" type="url" maxLength={255}/>
            <TextField id="description" label="Description" variant="outlined" type="text"/>

            <Stack pt={2}>
              <CommonButton label="Save Product" type="submit"/>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  )
}

export default AddProductScreen;
