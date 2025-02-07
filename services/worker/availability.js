import axios from "axios";
import { resolvePromise } from "../../lib/http";
import { getFromLocalStorage } from "../../lib/localStorage";
import { ENV_API_BASE_URL } from "../../lib/backend";

export const workerTodayAvailabilityFetch = resolvePromise(async () => {
  const apiUrl = ENV_API_BASE_URL + `/worker/available/today`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res?.availability;
});

export const workerMarkActiveToday = resolvePromise(async () => {
  const apiUrl = ENV_API_BASE_URL + `/worker/available/today`;
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
});

export const workerRequestLeave = resolvePromise(
  async ({ startDate, endDate }) => {
    const apiUrl =
      ENV_API_BASE_URL + `/worker/leave/${startDate}/to/${endDate}`;
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
