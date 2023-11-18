import { API_URL } from "../utils/constants";
import { getAccessToken } from "../common/services/auth";

export const getAddresses = async () => {
  const accessToken = getAccessToken();

  return await fetch(
    `${API_URL}/addresses`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    }
  );
}

export const addAddress = async (address) => {
  const accessToken = getAccessToken();

  return await fetch(
    `${API_URL}/addresses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(address),
    }
  );
}
