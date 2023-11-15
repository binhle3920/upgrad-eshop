export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRODUCTS: "/products",

  // ADMIN
  ADMIN: {
    ADD_PRODUCT: "/admin/add-product",
    EDIT_PRODUCT: "/admin/edit-product",
  }
}

export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER"
}
export const API_URL = "https://upgrad-eshop-be-production.up.railway.app/api";

export const AUTO_CLOSE_NOTIFICATIONS_DURATION = 3000; // 3 seconds

export const CATEGORY_OPTIONS = {
  APPAREL: 'Apparel',
  ELECTRONICS: 'Electronics',
  PERSONAL_CARE: 'Personal Care',
};

export const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
