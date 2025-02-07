import axios from "axios";
import { resolvePromise } from "../../lib/http";
import { ENV_API_BASE_URL } from "../../lib/backend";
import { getFromLocalStorage } from "../../lib/localStorage";

export const workerAppoinmentsFetch = resolvePromise(async ({ from, to }) => {
  const apiUrl = ENV_API_BASE_URL + `/worker/appoinments`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
    params: { from, to },
  });
  return res?.appoinments;
});

export const workerAppoinmentsAnswerAssigning = resolvePromise(
  async ({ id, assigningStatus }) => {
    const apiUrl =
      ENV_API_BASE_URL + `/worker/appoinment/${id}/${assigningStatus}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res?.message;
  }
);
