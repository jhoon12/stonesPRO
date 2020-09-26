const id = document.getElementById("Id");
const password = document.getElementById("password");
const name = document.getElementById("name");
const passwordCheck = document.getElementById("passwordCheck");
const form = document.getElementById("form");
const passwordFalse = document.getElementById("passwordFalse");

form.onsubmit = async (e) => {
  e.preventDefault();
  //   location.href='./mainUI.html';
  try {
    if (password.value !== passwordCheck.value) {
      passwordFalse.style.opacity = 1;
      return;
    }
    if (password.value === passwordCheck.value) {
      passwordFalse.style.opacity = 0;
      const nameValue = name.value;
      const username = id.value;
      const passwordValue = password.value;
      const res = await axios({
        method: "post",
        url: `${CONSTANT.SERVER_ADRESS}/user`,
        data: {
          userId: username,
          password: passwordValue,
          name: nameValue,
        },
      });
      if (res.status === 200) {
        alert("계정 생성 완료");
        window.location.href = "../Login/Login.html";
      }
    }
  } catch (err) {
    if (err.response.status === 409) {
      alert("이미 있는 유저입니다.");
    } else console.log(err);
  }
};
