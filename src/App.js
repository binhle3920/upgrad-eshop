import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./common/components/Layout";
import AuthGuard from "./common/components/AuthGuard";
import { ROUTES } from "./utils/constants";
import LoginScreen from "./components/login/Login";
import SignUpScreen from "./components/signup/SignUp";
import HomeScreen from "./components/home/Home";
import NotFoundScreen from "./components/404/404";
import AdminGuard from "./common/components/AdminGuard";
import AddProductScreen from "./components/admin/AddProduct";
import EditProductScreen from "./components/admin/EditProduct";
import OrderScreen from "./components/order/Order";
import ProductDetailScreen from "./components/details/ProductDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<AuthGuard />}>
            <Route path={ROUTES.HOME} element={<HomeScreen />} />
            <Route path={ROUTES.ORDER} element={<OrderScreen />} />
            <Route path={`${ROUTES.PRODUCTS}/:id`} element={<ProductDetailScreen/>} />

            <Route element={<AdminGuard />}>
              <Route path={ROUTES.ADMIN.ADD_PRODUCT} element={<AddProductScreen />} />
              <Route path={`${ROUTES.ADMIN.EDIT_PRODUCT}/:id`} element={<EditProductScreen />} />
            </Route>
            {/* TODO: Add others guarded routes below this line */}
          </Route>

          <Route path={ROUTES.LOGIN} element={<LoginScreen />} />
          <Route path={ROUTES.SIGNUP} element={<SignUpScreen />} />

          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
