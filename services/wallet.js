import axios from "axios";
import { resolvePromise } from "../lib/http";
import { ENV_API_BASE_URL } from "../lib/backend";
import { getFromLocalStorage } from "../lib/localStorage";

export const walletFetch = resolvePromise(async () => {
  const apiUrl = ENV_API_BASE_URL + `/wallet`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res?.walletDetail;
});

export const userFetchByIdOrPhone = resolvePromise(async (identifier) => {
  const apiUrl = ENV_API_BASE_URL + `/user/${identifier}`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res;
});

export const adminGiveCreditToUser = resolvePromise(
  async ({ id, role, balance }) => {
    const apiUrl = ENV_API_BASE_URL + `/wallet/transfer/to/${role}/${id}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { balance },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res?.message;
  }
);

export const AdminTnxHistoryFetch = resolvePromise(async () => {
  const apiUrl = ENV_API_BASE_URL + `/tnx/history`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res;
});

export const walletWithdrawRequest = resolvePromise(async ({ balance }) => {
  const apiUrl = ENV_API_BASE_URL + `/wallet/withdraw/request`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.put(
    apiUrl,
    { balance },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res?.message;
});

export const adminWalletWithdrawApprove = resolvePromise(
  async ({ id, paymentMethod, bankTxnId }) => {
    const apiUrl = ENV_API_BASE_URL + `/wallet/withdraw/approve/${id}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { paymentMethod, bankTxnId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res?.message;
  }
);

export const AdminWalletForWithdrawFetch = resolvePromise(async (id) => {
  const apiUrl = ENV_API_BASE_URL + `/wallet/withdraw/txn/${id}`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res?.wallet;
});

export const userTnxHistoryFetch = resolvePromise(async () => {
  const apiUrl = ENV_API_BASE_URL + `/tnx/history/user`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res;
});

export const adminTotalWalletFetch = resolvePromise(async () => {
  const apiUrl = ENV_API_BASE_URL + `/kabadpe/wallet/total`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res;
});

export const adminWalletLimitFetch = resolvePromise(async () => {
  const apiUrl = ENV_API_BASE_URL + `/wallet/limit`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res;
});

export const adminWalletLimitUpdate = resolvePromise(
  async ({ franchise, worker }) => {
    const apiUrl = ENV_API_BASE_URL + `/wallet/limit`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { franchise, worker },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res?.message;
  }
);
