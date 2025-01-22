import { createAsyncThunk } from "@reduxjs/toolkit";

function errorLogger(error, rejectWithValue) {
  if (error?.response?.data?.errors?.[0]?.message) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.message);
  } else {
    return rejectWithValue(error?.message);
  }
}

function initialSucesspayloadCreator(data, payload) {
  return { data, payload };
}

export const asyncThunk = (
  reduxPath,
  api,
  sucessPayloadCreator = initialSucesspayloadCreator
) => {
  return createAsyncThunk(reduxPath, async (data, { rejectWithValue }) => {
    try {
      const res = await api(data);
      return sucessPayloadCreator(res, data);
    } catch (e) {
      console.log(
        "this is login error",
        e?.message,
        e?.response?.data?.errors?.[0]?.message,
        data,
        JSON.stringify(e, null, 2)
      );
      return errorLogger(e, rejectWithValue);
    }
  });
};
