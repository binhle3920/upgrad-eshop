import { ProductsContext, useProductsProvider } from "./products-context";

const ProductsProvider = (props) => {
  const {children} = props;

  const products = useProductsProvider();

  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;
