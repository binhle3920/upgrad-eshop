import { useState, createContext, useContext, useEffect } from "react";
import { addProduct, getProducts, removeProduct } from "../../api/product";

export const ProductsContext = createContext(undefined);

export const useProductsProvider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    const data = await response.json();
    setProducts(data);
  }

  const add = async (product) => {
    const response = await addProduct(product);

    if (response.status === 201) {
      fetchProducts();

      return {
        severity: 'success',
        message: `Product ${product.name} added successfully`
      }
    } else {
      return {
        severity: 'error',
        message: `Error adding product ${product.name}`
      }
    }
  }

  const remove = async (productId) => {
    const deletedProduct = products.find(product => product.id === productId);
    const response = await removeProduct(productId);

    if (response.status === 204) {
      setProducts((prev) => prev.filter(product => product.id !== productId));

      return {
        severity: 'success',
        message: `Product ${deletedProduct.name} deleted successfully`
      }
    } else {
      return {
        severity: 'error',
        message: `Error deleting product ${deletedProduct.name}`
      }
    }
  }

  return {
    products,
    addProduct: add,
    removeProduct: remove
  }
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a provider');
  }

  return context;
};
