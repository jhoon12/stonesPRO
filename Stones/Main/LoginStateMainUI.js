const NameText = document.getElementById("NameText");
const TimeText = document.getElementById("TimeText");
const stonesExpression = document.getElementById("stonesExpression");
const logout = document.getElementById("logout");
const todo = document.getElementById("todo");
const add = document.getElementById("add");
const centerImg = document.getElementById("centerImg");
document.getElementById("myStones").onclick = () => {
  window.location.href = "../MainBar/MyStones.html";
};
let addCheck = 1;
document
  .querySelectorAll(".toDoCheck")
  .forEach((element) => (element.onclick = changeStyle));
document.getElementById("success").onclick = submitPlan;
add.onclick = addPlan;

let TextArr = [];

function submitPlan() {
  const activedInputLength = Array.from(
    document.querySelectorAll("input.input")
  ).filter((ele) => ele.value !== "").length;
  const activeButtonLength = document.querySelectorAll(".toDoCheck.active")
    .length;
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const timeMinutes = `${hours}:${minutes}`;
  if (activedInputLength === activeButtonLength) {
    (async () => {
      try {
        await axios({
          method: "post",
          url: `${CONSTANT.SERVER_ADRESS}/todo/success`,
          data: {
            time: timeMinutes,
          },
          headers: {
            "access-token": localStorage.accessToken,
          },
        });
      } catch (err) {
        ErrorHandler(err.response.status, [
          {
            errStatus: 401,
            func: () => {
              submitPlan();
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
        console.log(err.response.status);
        if (err.response.status === 201) {
        }
      }
    })().then(alert("할 일을 모두 마쳤습니다!"));
  } else {
    alert("할 일을 모두 마치지 못했습니다!");
  }
}

async function addPlan() {
  document.querySelectorAll(".input").forEach((text) => {
    TextArr.push(text.value);
  });
  const today = new Date();
  const year = today.getFullYear(); // 년도
  const month = today.getMonth() + 1; // 월
  const date = today.getDate();
  const PostDate = `${year}-${month}-${date}`;
  try {
    const res = await axios({
      method: "post",
      url: `${CONSTANT.SERVER_ADRESS}/todo`,
      data: {
        todo: TextArr,
        today : PostDate
      },
      headers: {
        "access-token": localStorage.accessToken,
      },
    });
    window.location.reload();
  } catch (err) {
    ErrorHandler(err.response.status, [
      {
        errStatus: 401,
        func: () => {
          addPlan();
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
    console.log(err.response.status);
    if (err.response.status === 409) {
      alert("이미 추가하셨습니다.");
    }
  }
}

function changeStyle() {
  if (this.parentElement.querySelector("input").value === "") return;
  this.classList.toggle("active"); //클래스가 있으면 추가, 없으면 추가 X
}

window.onload = load;
logout.onclick = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "../Login/Login.html";
};
async function load() {
  console.log("로딩");
  try {
    const res = await axios({
      method: "get",
      url: `${CONSTANT.SERVER_ADRESS}/main`,
      headers: {
        "access-token": localStorage.accessToken,
      },
    });
    if(res.data.main.stone === null){
      
      centerImg.src = "../Img/Stones6.png";
    }
    console.log(res.data)
    switch(res.data.main.stone.level){
      case 1:
        centerImg.src ="../Img/Stones1.png"
        break;
      case 2:
        centerImg.src = "../Img/Stones2.png"
        break;
      case 3:
        centerImg.src = "../Img/Stones3.png"
        break;
      case 4:
        centerImg.src = "../Img/Stones4.png"
        break;
      case 5:
        centerImg.src = "../Img/Stones5.png"
    }
    const replaceStr = res.data.phrase.word.replace(/\./g, ".\n"); //정규표현식
    stonesExpression.innerText = `"${replaceStr}"\n -${res.data.phrase.name}-`;
    NameText.innerText = `${res.data.main.name}님`;

    const todoArr = document.querySelectorAll(".todo");
    TimeText.innerText = `${res.data.main.time}까지 계획을 완료해야 합니다!`;
    if (res.data.main.todos) {
      res.data.main.todos.forEach((arrElements, index) => {
        todoArr[
          index
        ].innerHTML = `<input class="input" value=${arrElements.todo} >`;
      });
    }

  } catch (e) {
    ErrorHandler(e.response.status, [
      {
        errStatus: 401,
        func: () => {
          RefreshRequest();
          alert("세션이 만료되었습니다. 새로고침 해주세요");
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
}
