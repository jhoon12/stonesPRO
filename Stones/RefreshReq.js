const RefreshRequest = async () => {
  try {
    const res = await axios.get(`${CONSTANT.SERVER_ADRESS}/user/refresh`, {
      headers: { "refresh-token": localStorage.getItem("refreshToken") },
    });
    if (res.status === 200) {
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", res.data.accessToken);
    } else if (res.status === 403) console.log("로그인 안됨");
  } catch (e) {}
};

const ErrorHandler = (errStatus, option) => {
  const obj = {};

  try {
    option.forEach((now) => {
      obj[now.errStatus] = now.func;
    });

    obj[errStatus]();
  } catch (err) {
    new Error(`undefinded ${errStatus} func`);
  }
};
