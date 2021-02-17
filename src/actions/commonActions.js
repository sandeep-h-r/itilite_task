const CHECK_INTERNET = 'CHECK_INTERNET';

const checkInternet = (status) => {
  return {
    type: CHECK_INTERNET,
    status,
  };
};

export {checkInternet, CHECK_INTERNET};
