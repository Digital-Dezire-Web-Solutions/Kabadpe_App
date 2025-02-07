export const resolvePromise = (asyncFn) => {
  return (data) => {
    const promise = new Promise((resolve) => {
      asyncFn(data)
        .then((res) => resolve(res))
        .catch((e) => {
          console.log("eroor in api calling", JSON.stringify(e, null, 2));
          resolve({
            error: true,
            message:
              e?.response?.data?.errors?.[0]?.message ||
              e?.message ||
              `error in calling api ${asyncFn?.name}`,
            errors: e?.response?.data?.errors || [
              {
                message: e?.message || `error in calling api ${asyncFn?.name}`,
              },
            ],
          });
        });
    });
    return promise;
  };
};
