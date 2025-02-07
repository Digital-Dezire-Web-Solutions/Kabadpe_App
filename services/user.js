import axios from "axios";
import { getFromLocalStorage } from "../lib/localStorage";
import { ENV_API_BASE_URL } from "../lib/backend";
import { resolvePromise } from "@/lib/http";
import * as FileSystem from "expo-file-system";
export const getUser = async ({ type = "user", tk}) => {
  const apiUrl = ENV_API_BASE_URL + `/${type}`;
  const token = tk || (await getFromLocalStorage("token"));
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const userAddressesFetch = resolvePromise(async ({ id }) => {
  const apiUrl = ENV_API_BASE_URL + `/user/address?id=${id}}`;
  const token = await getFromLocalStorage("token");
  // console.log("this is token 2", token);
  const { data: res } = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res?.addresses;
});

export const userAddressesAdd = resolvePromise(
  async ({
    street,
    city,
    state,
    zipCode,
    locationType,
    landmark,
    aria,
    subAria,
    userId,
  }) => {
    const apiUrl = ENV_API_BASE_URL + `/user/address?userId=${userId}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.post(
      apiUrl,
      { street, city, state, zipCode, locationType, landmark, aria, subAria },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res?.message;
  }
);

export const userAddressesUpdate = resolvePromise(
  async ({
    street,
    city,
    state,
    zipCode,
    locationType,
    landmark,
    id,
    aria,
    subAria,
    userId,
  }) => {
    const apiUrl = ENV_API_BASE_URL + `/user/address/${id}?userId=${userId}`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { street, city, state, zipCode, locationType, landmark, aria, subAria },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res?.message;
  }
);

export const userAddressDelete = resolvePromise(async (id) => {
  const apiUrl = ENV_API_BASE_URL + `/user/address/${id}`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.delete(apiUrl, {
    headers: {
      Authorization: token,
    },
  });
  return res?.message;
});

export const userResetPassword = resolvePromise(
  async ({ newPassword, confirmNewPassword }) => {
    const apiUrl = ENV_API_BASE_URL + `/user/password/reset`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { newPassword, confirmNewPassword },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res?.message;
  }
);

export const userProfileImageAdd = resolvePromise(async (image) => {
  const apiUrl = ENV_API_BASE_URL + `/user/profileimage`;
  const token = await getFromLocalStorage("token");
  const formData = new FormData();
  let { fileName: name, fileSize: size, uri, mimeType } = image;
  let nameParts = name?.split(".");
  let fileType = nameParts[nameParts?.length - 1];
  var fileToUpload = {
    name: name,
    size: size,
    uri: uri,
    type: "application/" + fileType,
    // mimeType,
  };
  formData.append("image", fileToUpload);
  const { data: res } = await axios.post(apiUrl, formData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });
  return res?.message;
});

export const userUpdateProfileRequset = resolvePromise(
  async ({ fullname, email, phoneNumber }) => {
    const apiUrl = ENV_API_BASE_URL + `/user/profile/request`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { fullname, email, phoneNumber },
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res?.code;
  }
);

export const userUpdateProfileCallback = resolvePromise(
  async ({ otp, code }) => {
    const apiUrl = ENV_API_BASE_URL + `/user/profile/callback`;
    const token = await getFromLocalStorage("token");
    const { data: res } = await axios.put(
      apiUrl,
      { otp, code },
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res?.meassage;
  }
);

export const userUpdateProfile = resolvePromise(async ({ ...data }) => {
  const apiUrl = ENV_API_BASE_URL + `/user/personalInfo`;
  const token = await getFromLocalStorage("token");
  const { data: res } = await axios.put(
    apiUrl,
    { ...data },
    {
      headers: {
        Authorization: token,
        // "Content-Type": "multipart/form-data",
      },
    }
  );
  return res?.message;
});
