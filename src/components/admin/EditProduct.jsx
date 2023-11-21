import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../../api/product";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import CommonButton from "../../common/components/Button";
import { CATEGORY_OPTIONS } from "../../utils/constants";
import { useProducts } from "../../context/products/products-context";
import { useSnackbar } from "../../context/snackbar/snackbar-context";

const EditProductScreen = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS.APPAREL);
  const [manufacturer, setManufacturer] = useState('');
  const [availableItems, setAvailableItems] = useState(0);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const {id} = useParams();
  const {modifyProduct} = useProducts();
  const {showNotification} = useSnackbar();

  useEffect(() => {
    getProduct(id).then(async (response) => {
      const productDetail = await response.json();
      setName(productDetail.name);
      setCategory(productDetail.category);
      setManufacturer(productDetail.manufacturer);
      setAvailableItems(productDetail.availableItems);
      setPrice(productDetail.price);
      setImageUrl(productDetail.imageUrl);
      setDescription(productDetail.description);
    })
  }, [id]);

  const handleChange = (key, value) => {
    switch (key) {
      case 'name':
        setName(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'manufacturer':
        setManufacturer(value);
        break;
      case 'availableItems':
        setAvailableItems(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'imageUrl':
        setImageUrl(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      category,
      manufacturer,
      availableItems,
      price,
      imageUrl,
      description,
    }

    const response = await modifyProduct(id, product);
    showNotification(response);
  }

  return (
    <Stack justifyContent="center" alignItems="center">
      <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" mt={10} width={400}>
        <Typography variant="h4" pb={2}>
          Modify Product
        </Typography>

        <form onSubmit={handleSubmit} style={{
          width: '100%',
        }}>
          <Stack direction="column" spacing={2} width="100%">
            <TextField
              value={name}
              onChange={(e) => handleChange('name', e.target.value)}
              id="name"
              label="Name"
              variant="outlined"
              type="text"
              required
              maxLength={255}
            />

            <FormControl id="category">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                label="Category"
                onChange={(e) => handleChange('category', e.target.value)}
                value={category}
              >
                <MenuItem value={CATEGORY_OPTIONS.APPAREL}>Apparel</MenuItem>
                <MenuItem value={CATEGORY_OPTIONS.ELECTRONICS}>Electronics</MenuItem>
                <MenuItem value={CATEGORY_OPTIONS.PERSONAL_CARE}>Personal Care</MenuItem>
              </Select>
            </FormControl>
            <TextField
              value={manufacturer}
              onChange={(e) => handleChange('manufacturer', e.target.value)}
              id="manufacturer"
              label="Manufacturer"
              variant="outlined"
              type="text"
              required
              maxLength={255}
            />
            <TextField
              value={availableItems}
              onChange={(e) => handleChange('availableItems', e.target.value)}
              id="availableItems"
              label="Available Items"
              variant="outlined"
              type="number"
              required
            />
            <TextField
              value={price}
              onChange={(e) => handleChange('price', e.target.value)}
              id="price"
              label="Price"
              variant="outlined"
              type="number"
              required
            />
            <TextField
              value={imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
              id="imageUrl"
              label="Image"
              variant="outlined"
              type="url"
              maxLength={255}/>
            <TextField
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
              id="description"
              label="Description"
              variant="outlined"
              type="text"
            />

            <Stack pt={2}>
              <CommonButton label="Modify Product" type="submit"/>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  )
}

export default EditProductScreen;
