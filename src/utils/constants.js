export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",

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

export const API_URL = "http://localhost:8080/api";

export const AUTO_CLOSE_NOTIFICATIONS_DURATION = 3000; // 3 seconds
