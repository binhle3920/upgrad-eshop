import { useProducts } from "../../context/products/products-context";
import { Alert, Box, Snackbar } from "@mui/material";
import ProductItem from "../../common/components/ProductItem";
import ConfirmDialog from "../../common/components/ConfirmDialog";
import { useState } from "react";
import { AUTO_CLOSE_NOTIFICATIONS_DURATION } from "../../utils/constants";

const HomeScreen = () => {
  const { products, removeProduct } = useProducts();

  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [message, setMessage] = useState(null);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

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
    setMessage(response);
    setIsOpenSnackbar(true);
    handleCloseDeleteDialog();
  }

  return (
    <Box p={4}>
      {
        products.map(product => (
          <ProductItem key={product.id} {...product} onDelete={handleShowDeleteDialog} />
        ))
      }

      <ConfirmDialog
        open={isOpenConfirmDialog}
        onClose={handleCloseDeleteDialog}
        title="Confirm deletion of product!"
        description="Are you sure you want to delete the product?"
        onSubmit={handleDeleteProduct}
      />

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
    </Box>
  )
}

export default HomeScreen;
