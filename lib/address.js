export const getCities = (state, res) => {
  return [
    ...new Set(
      res
        .filter(
          (e) => e?.state?.toLowerCase()?.trim() == state?.toLowerCase()?.trim()
        )
        .map((e, i) => e?.city?.toLowerCase()?.trim())
    ),
  ].map((name, i) => ({ id: i, name }));
};

export const getPincodes = (state, city, res) => {
  return [
    ...new Set(
      res
        .filter(
          (e) =>
            e.state?.toLowerCase()?.trim() == state?.toLowerCase()?.trim() &&
            e.city?.toLowerCase()?.trim() == city?.toLowerCase()?.trim()
        )
        .map((e, i) => e?.pincode?.toLowerCase()?.trim())
    ),
  ].map((name, i) => ({ id: i, name }));
};
export const getArias = (state, city, pincode, res) => {
  return [
    ...new Set(
      res
        .filter(
          (e) =>
            e.state?.toLowerCase()?.trim() == state?.toLowerCase()?.trim() &&
            e.city?.toLowerCase()?.trim() == city?.toLowerCase()?.trim() &&
            e?.pincode?.toLowerCase()?.trim() == pincode?.toLowerCase()?.trim()
        )
        .map((e, i) => e?.ariaName?.toLowerCase()?.trim())
    ),
  ].map((name, i) => ({ id: i, name }));
};

export const getSubArias = (state, city, pincode, aria, res) => {
  return res.filter(
    (e) =>
      e.state?.toLowerCase()?.trim() == state?.toLowerCase()?.trim() &&
      e.city?.toLowerCase()?.trim() == city?.toLowerCase()?.trim() &&
      e?.pincode?.toLowerCase()?.trim() == pincode?.toLowerCase()?.trim() &&
      e?.ariaName?.toLowerCase()?.trim() == aria?.toLowerCase()?.trim()
  );
};

export const getStates = (res) =>
  [...new Set(res.map((e, i) => e?.state))].map((name, i) => ({
    id: i,
    name,
  }));
