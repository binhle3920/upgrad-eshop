import { jwtDecode } from "jwt-decode";
import { getRoles } from "../common/services/auth";

export const convertAccessTokenToUser = (accessToken) => {
  const username = jwtDecode(accessToken).sub;
  const roles = getRoles();

  return {
    username,
    roles: [roles]
  };
}
