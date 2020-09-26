const Title = document.querySelector(".head");
const logout = document.getElementById('logout');

logout.onclick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "../Login/Login.html";
  };
  