import { API_URL } from "../utils/constants";
import { getAccessToken } from "../common/services/auth";

export const addProduct = async ({name, category, price, description, manufacturer, availableItems, imageUrl}) => {
  const accessToken = getAccessToken();

  return await fetch(
    `${API_URL}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({name, category, price, description, manufacturer, availableItems, imageUrl}),
    }
  );
}

export const getProducts = async () => {
  return await fetch(
    `${API_URL}/products`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export const getProduct = async (id) => {
  return await fetch(
    `${API_URL}/products/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export const removeProduct = async (productId) => {
  const accessToken = getAccessToken();

  return await fetch(
    `${API_URL}/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    }
  )
}

export const modifyProduct = async (productId, {
  name,
  category,
  price,
  description,
  manufacturer,
  availableItems,
  imageUrl
}) => {
  const accessToken = getAccessToken();

  return await fetch(
    `${API_URL}/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({name, category, price, description, manufacturer, availableItems, imageUrl}),
    }
  )
}

export const getProductCategories = async () => {
  return await fetch(
    `${API_URL}/products/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
