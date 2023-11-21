import { useProducts } from "../../context/products/products-context";
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ProductItem from "../../common/components/ProductItem";
import ConfirmDialog from "../../common/components/ConfirmDialog";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../context/snackbar/snackbar-context";
import { getProductCategories } from "../../api/product";

const HomeScreen = () => {
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('default');

  const {products, removeProduct, filterProducts, sortProducts} = useProducts();
  const {showNotification} = useSnackbar();

  useEffect(() => {
    getProductCategories().then(async (response) => {
      const list = await response.json();
      setCategories(['All', ...list]);
    });
  }, []);

  const handleShowDeleteDialog = (id) => {
    setIsOpenConfirmDialog(true);
    setSelectedProductId(id);
  }

  const handleCloseDeleteDialog = () => {
    setIsOpenConfirmDialog(false);
    setSelectedProductId(null);
  }

  const handleCategoryChange = (e, value) => {
    setSelectedCategory(value);
    filterProducts(value);
  }

  const handleSortChange = (e, child) => {
    setSelectedSort(child.props.value);
    sortProducts(child.props.value);
  }

  const handleDeleteProduct = async () => {
    const response = await removeProduct(selectedProductId);
    showNotification(response);
    handleCloseDeleteDialog();
  }

  return (
    <>
      <Stack alignItems="center" justifyContent="center">
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="category"
          size="large"
          sx={{marginTop: 4}}
        >
          {categories.map((category) => (
            <ToggleButton key={category} value={category} aria-label={category} sx={{textTransform: 'uppercase'}}>
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      <Box p={4}>
        <FormControl sx={{width: 500, ml: 5, mb: 5}}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={selectedSort}
            label="Sort By:"
            onChange={handleSortChange}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="priceDesc">Price: High to Low</MenuItem>
            <MenuItem value="priceAsc">Price: Low to High</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>

        <Stack direction='row' justifyContent="space-evenly" sx={{flexWrap: 'wrap', rowGap: 5, columnGap: 5}}>
          {products.map(product => (
            <ProductItem key={product.id} {...product} onDelete={handleShowDeleteDialog}/>
          ))}
        </Stack>
      </Box>

      <ConfirmDialog
        open={isOpenConfirmDialog}
        onClose={handleCloseDeleteDialog}
        title="Confirm deletion of product!"
        description="Are you sure you want to delete the product?"
        onSubmit={handleDeleteProduct}
      />
    </>
  )
}

export default HomeScreen;
