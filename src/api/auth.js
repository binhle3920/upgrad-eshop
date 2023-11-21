import { API_URL } from "../utils/constants";

export const signUp = async ({firstName, lastName, email, contactNumber, password}) => {
  return await fetch(
    `${API_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password, firstName, lastName, contactNumber}),
    }
  );
}

export const login = async ({username, password}) => {
  return await fetch(
    `${API_URL}/auth/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}),
    }
  );
}
