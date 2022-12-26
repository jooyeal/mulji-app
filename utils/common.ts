export const isLocationChangedWithFloor = (
  prev?: number,
  curr?: number
): boolean => {
  if (prev && curr) {
    const DIGIT = 10000;
    const prevFloor = Math.floor(prev * DIGIT) / DIGIT;
    const currFloor = Math.floor(curr * DIGIT) / DIGIT;
    if (prevFloor === currFloor) {
      return false;
    } else {
      return true;
    }
  } else {
    if (prev === curr) {
      return false;
    } else {
      return true;
    }
  }
};
