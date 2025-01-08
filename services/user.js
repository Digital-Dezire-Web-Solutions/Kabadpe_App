import axios from "axios";
import { getFromLocalStorage } from "../lib/localStorage";
import { ENV_API_BASE_URL } from "../lib/backend";

export const getUser = async ({ type = "user" }) => {
  const apiUrl = ENV_API_BASE_URL + `/${type}`;
  const token =
    type == "user"
      ? getFromLocalStorage("token")
      : getFromLocalStorage("vendorToken");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
