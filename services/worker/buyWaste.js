import axios from "axios";
import { resolvePromise } from "../../lib/http";
import { ENV_API_BASE_URL } from "../../lib/backend";
import { getFromLocalStorage } from "../../lib/localStorage";

export const workerRateListFetch = resolvePromise(async ({ ariaId }) => {
  const apiUrl = ENV_API_BASE_URL + `/worker/ratelist/${ariaId}`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res?.rates;
});

export const workerBuyWasteRequest = resolvePromise(async ({ phoneNumber }) => {
  const apiUrl = ENV_API_BASE_URL + "/worker/buy/request";
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.put(
    apiUrl,
    { phoneNumber },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res;
});

export const workerBuyWasteCallback = resolvePromise(
  async ({ type = "cash", ...data }) => {
    const apiUrl = ENV_API_BASE_URL + `/worker/buy/callback/${type}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { ...data },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res;
  }
);
