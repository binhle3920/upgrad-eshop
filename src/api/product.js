import { API_URL } from "../common/utils/constants";
import { getAccessToken } from "../common/services/auth";

export const addProduct = async ({ name, category, price, description, manufacturer, availableItems, imageUrl }) => {
  const accessToken = getAccessToken();

  return await fetch(
    `${API_URL}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({ name, category, price, description, manufacturer, availableItems, imageUrl }),
    }
  );
}
