export const fetchData = () => {
  let url = "https://5dc588200bbd050014fb8ae1.mockapi.io/assessment";

  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.warn(err));
};
