export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};

export function capitalizeFirstLetter(str) {
  if (!str) return ""; // Handle empty string or null
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function truncateLongString(str, maxLength) {
  if (str.length > maxLength) {
    return capitalizeFirstLetter(str).slice(0, maxLength) + "...";
  }
  return str;
}
