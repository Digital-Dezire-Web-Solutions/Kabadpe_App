import axios from "axios";
import { resolvePromise } from "../lib/http";
import { getFromLocalStorage } from "../lib/localStorage";
import { ENV_API_BASE_URL } from "../lib/backend";

export const userScheduleAppoinment = resolvePromise(
  async ({
    appoinmentAddress,
    appointmentContactNumber,
    appointmentPersonName,
    appointmentTimeSlot,
    estimateWeight,
    companyId,
    frequency,
    serviceType,
    appointmentDate,
    appoinmentAria,
    ariaId,
    userId,
  }) => {
    const apiUrl =
      ENV_API_BASE_URL + `/user/kabadPe/schedualPickup?userId=${userId}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.post(
      apiUrl,
      {
        appoinmentAddress,
        appointmentContactNumber,
        appointmentPersonName,
        appointmentTimeSlot,
        estimateWeight,
        companyId,
        frequency,
        serviceType,
        appointmentDate,
        appoinmentAria,
        ariaId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res;
  }
);

export const userAppoinmentsFetch = resolvePromise(
  async ({ from, to } = {}) => {
    const apiUrl = ENV_API_BASE_URL + `/user/kabadPe/appointments`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.get(apiUrl, {
      params: { from, to },
      headers: {
        Authorization: token,
      },
    });
    return res?.orders;
  }
);

export const userReportAppoinment = resolvePromise(
  async ({ id, title, description }) => {
    const apiUrl = ENV_API_BASE_URL + `/user/kabadPe/appointments/${id}/report`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { title, description },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res?.message;
  }
);

export const userAddReview = resolvePromise(
  async ({ id, rating, description }) => {
    const apiUrl =
      ENV_API_BASE_URL + `/user/kabadPe/appointments/${id}/addReview`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { rating, description },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res?.message;
  }
);

export const userServicableAriasFetch = resolvePromise(async () => {
  const apiUrl = ENV_API_BASE_URL + `/user/kabadPe/servicablearias`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res?.arias;
});

export const userValidateServicability = resolvePromise(
  async ({ state, pincode, ariaName, subAriaName, controller }) => {
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    const signal = controller.signal;
    const apiUrl = ENV_API_BASE_URL + `/user/service/validation`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.post(
      apiUrl,
      { state, pincode, ariaName, subAriaName },
      {
        headers: {
          Authorization: token,
        },
        signal,
      }
    );
    return res?.servicableAria;
  }
);

export const userFetchAvailableCompanies = resolvePromise(
  async ({ ariaId, date, service, userId }) => {
    const apiUrl =
      ENV_API_BASE_URL +
      `/user/${service}/availablecompanies/${ariaId}?date=${date}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.get(apiUrl, {
      headers: {
        Authorization: token,
      },
    });
    return res?.availableCompanies;
  }
);

export const userFetchAvailableSlots = resolvePromise(
  async ({ franchiseId, date, aria }) => {
    const apiUrl =
      ENV_API_BASE_URL +
      `/user/service/slotavailable/${franchiseId}?date=${date}&aria=${aria}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.get(apiUrl, {
      headers: {
        Authorization: token,
      },
    });
    return res?.availableSlots;
  }
);

export const adminAppoinmentsFetch = resolvePromise(async ({ type }) => {
  const apiUrl = ENV_API_BASE_URL + `/admin/appoinments?type=${type}`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res?.appoinments;
});

export const adminServicableWorkersFetch = resolvePromise(
  async ({ worker, ariaId, date }) => {
    const apiUrl =
      ENV_API_BASE_URL + `/admin/servicable/${worker}/${ariaId}?date=${date}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.get(apiUrl, {
      headers: {
        Authorization: token,
      },
    });
    return res?.workers;
  }
);

export const adminAppoinmentAssign = resolvePromise(
  async ({ appoinmentId, workerId }) => {
    const apiUrl =
      ENV_API_BASE_URL + `/admin/assignAppoinment/${appoinmentId}/${workerId}`;
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
    return res?.workers;
  }
);

export const adminAppoinmentForAssigningDateFetch = resolvePromise(
  async (date) => {
    const apiUrl = ENV_API_BASE_URL + `/admin/appinment/${date}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.get(apiUrl, {
      headers: {
        Authorization: token,
      },
    });
    return res?.appoinment;
  }
);

export const adminAppoinmentCancel = resolvePromise(
  async ({ id, flow = "" }) => {
    const apiUrl =
      ENV_API_BASE_URL + `/admin/appoinment/${id}/cancel?flow=${flow}`;
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

export const adminAppoinmentReschedule = resolvePromise(
  async ({ id, appointmentTimeSlot, appointmentDate }) => {
    const apiUrl = ENV_API_BASE_URL + `/admin/appoinment/${id}/reschedule`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { appointmentTimeSlot, appointmentDate },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res?.message;
  }
);

export const adminWorkerInSameJobFetch = resolvePromise(
  async ({ date, serviceType, ariaId }) => {
    const apiUrl =
      ENV_API_BASE_URL + `/admin/appinment/${serviceType}/${ariaId}/${date}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.get(apiUrl, {
      headers: {
        Authorization: token,
      },
    });
    return res?.appoinment;
  }
);

export const adminChangeAppoinmentStatus = resolvePromise(
  async ({ id, orderStatus }) => {
    const apiUrl =
      ENV_API_BASE_URL + `/admin/appoinment/${id}/${orderStatus}/statusChange`;
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

export const adminGetUserForAppoinment = resolvePromise(async ({ id }) => {
  const apiUrl = ENV_API_BASE_URL + `/admin/user/${id}`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res?.user;
});
