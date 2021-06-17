export const formatDate = (array) => {
  for (let item of array) {
    let month = item.createdAt.slice(5, 7);
    let year = item.createdAt.slice(0, 4);
    let day = item.createdAt.slice(8, 10);
    let time = item.createdAt.slice(11, 16);
    if (parseInt(time.slice(0, 2)) > 12) {
      time = `${parseInt(time.slice(0, 2) - 12)}${time.slice(2)} pm`;
    } else {
      time = `${time} am`;
    }
    item.createdAt = `${month}/${day}/${year} at ${time}`;
  }
  return array;
};
