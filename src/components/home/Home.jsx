import { useProducts } from "../../context/products/products-context";
import { Box , Stack, ToggleButtonGroup, ToggleButton} from "@mui/material";
import ProductItem from "../../common/components/ProductItem";
import ConfirmDialog from "../../common/components/ConfirmDialog";
import { useState } from "react";
import { useSnackbar } from "../../context/snackbar/snackbar-context";

const HomeScreen = () => {
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { products, removeProduct } = useProducts();
  const { showNotification } = useSnackbar();

  const handleShowDeleteDialog = (id) => {
    setIsOpenConfirmDialog(true);
    setSelectedProductId(id);
  }

  const handleCloseDeleteDialog = () => {
    setIsOpenConfirmDialog(false);
    setSelectedProductId(null);
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
    //value={selectedCategory}
    exclusive
    //onChange={handleCategoryChange}
    aria-label="category"
    size="large"
    sx={{ marginTop: 2, marginLeft: 2 }}
  >
    <ToggleButton value="All" aria-label="All">
      ALL
    </ToggleButton>
    <ToggleButton value="Apparel" aria-label="Apparel">
      APPAREL
    </ToggleButton>
    <ToggleButton value="Electronics" aria-label="Electronics">
      ELECTRONICS
    </ToggleButton>
    <ToggleButton value="Footwear" aria-label="Footwear">
      FOOTWEAR
    </ToggleButton>
    <ToggleButton value="PersonalCare" aria-label="PersonalCare">
      PERSONAL CARE
    </ToggleButton>
  </ToggleButtonGroup>
  </Stack>
    <Box p={4}>
     <Stack direction='row' justifyContent="space-evenly" sx={{flexWrap:'wrap', rowGap:5 , columnGap:5}}> {
        products.map(product => (
          <ProductItem key={product.id} {...product} onDelete={handleShowDeleteDialog} />
        ))
      }
    </Stack>
      <ConfirmDialog
        open={isOpenConfirmDialog}
        onClose={handleCloseDeleteDialog}
        title="Confirm deletion of product!"
        description="Are you sure you want to delete the product?"
        onSubmit={handleDeleteProduct}
      />
    </Box>
    </>
  )
}

export default HomeScreen;
