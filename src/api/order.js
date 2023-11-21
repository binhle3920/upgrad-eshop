import { getAccessToken } from "../common/services/auth";
import { API_URL } from "../utils/constants";

export const addOrder = async ({quantity, addressId, productId}) => {
  const accessToken = getAccessToken();

  return await fetch(
    `${API_URL}/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({quantity, address: addressId, product: productId}),
    }
  );
}
