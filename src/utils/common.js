// EmailID Validation using Regular expression
export const validateEmail = (email) => {
  let checkEmailExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (checkEmailExp.test(email)) {
    return true;
  }
  return false;
};

// Capitalize first letter
export const capitalize = (s) => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};
