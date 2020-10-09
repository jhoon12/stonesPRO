const exe = document.querySelector(".Experience");
const nowLevel =document.querySelector(".nowLevel");
const nowStonesImg = document.querySelector(".nowStonesImg");
const stonesArr = document.querySelector(".stonesArr")
const GetData = async () => { 
  try {
    const {data} = await axios.get(`${CONSTANT.SERVER_ADRESS}/profile/stone`, {
      headers: { "access-token": localStorage.accessToken },
    });
    console.log(data.encyclopedia);
    data.encyclopedia.forEach(element => {
      const Box = document.createElement('div');
      Box.classList.add("Box");
      stonesArr.appendChild(Box);


      const levelImg =  document.createElement('img');
      switch(element.level){
         case 1:
           levelImg.src ="../Img/Stones1.png"
           break;
         case 2:
           levelImg.src = "../Img/Stones2.png"
           break;
         case 3:
           levelImg.src = "../Img/Stones3.png"
           break;
         case 4:
           levelImg.src = "../Img/Stones4.png"
           break;
         case 5:
           levelImg.src = "../Img/Stones5.png"
           
       }
       levelImg.classList.add('imgSize')
      Box.appendChild(levelImg)
      
     const goal =  document.createElement('div');
     goal.innerHTML = element.goal;
     goal.classList.add('goalList')
    Box.appendChild(goal)

     const date =  document.createElement('div');
     date.innerHTML = element.date;
    Box.appendChild(date)

    });
    nowLevel.innerText = `현재 나의 돌멩이 : ${data.stone.level} 단계`
    exe.style.width = `${data.stone.exp}%`;
    switch(data.stone.level){
      case 1:
        nowStonesImg.src ="../Img/Stones1.png"
        break;
      case 2:
        nowStonesImg.src = "../Img/Stones2.png"
        break;
      case 3:
        nowStonesImg.src = "../Img/Stones3.png"
        break;
      case 4:
        nowStonesImg.src = "../Img/Stones4.png"
        break;
      case 5:
        nowStonesImg.src = "../Img/Stones5.png"
    }
  } catch (err) {
    ErrorHandler(err.response.status, [
      {
        errStatus: 401,
        func: () => {
          alert("세션이 만료되었습니다. 새로고침 해주세요");
          RefreshRequest();
          console.log(err.status);
        },
      },
      {
        errStatus: 403,
        func: () => {
          console.log("다시 로그인하세요");
        },
      },
    ]);
  }
};
logout.onclick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "../Login/Login.html";
  };


window.onload = GetData;