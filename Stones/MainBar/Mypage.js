const Title = document.querySelector(".head");
const logout = document.getElementById("logout");
const submitDiary = document.querySelectorAll(".submitDiary");
const username = document.querySelector(".userName");
const goal = document.querySelector(".goal");
const term = document.querySelector(".term");
const diaryView = document.querySelector(".diary");
const CheckToDo = document.querySelectorAll(".CheckToDo");
const diary = document.querySelector(".diary");
const time = document.querySelector(".time");
const minutes = document.querySelector(".minutes");
const successObj = document.querySelector(".successObj");

const successObjBtn = document.querySelector(".successObjBtn");

successObjBtn.onclick = () => {
  try {
    (async () => {
      let date;
      const today = new Date();
      const year = today.getFullYear(); // 년도
      const month = today.getMonth() + 1; // 월
      if (today.getDate() < 10) {
        date = `0${today.getDate()}`;
      } else date = today.getDate();
      const PostDate = `${year}-${month}-${date}`;
      console.log(PostDate);
      const res = await axios.post(
        `${CONSTANT.SERVER_ADRESS}/goal/success`,
        { today: PostDate },
        { headers: { "access-token": localStorage.accessToken } }
      );
      if (res.status === 200) {
        const sign = confirm("목표를 완성했습니다. 새로운 목표를 만들겠습니까?");
        if (sign) {
          window.location.href = "../Goal/Goal.html";
        }
      } else if (res.status === 201) {
        const sign = confirm("목표를 완성했습니다. 새로운 목표를 만들겠습니까?");
        if (sign) {
          window.location.href = "../Goal/Goal.html";
        }
      } else if (res.status === 202) {
        alert("아직 목표를 설정하지 않았습니다. 새로운 목표를 설정하세요");
      }
    })();
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

const reset = (submitDiary[1].onclick = () => {
  try {
    (async () => {
      const res = await axios.put(
        `${CONSTANT.SERVER_ADRESS}/profile/time`,
        { time: `${time.value}:${minutes.value}` },
        { headers: { "access-token": localStorage.accessToken } }
      );
      alert("변경되었습니다.");
    })();
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
});

submitDiary[0].onclick = () => {
  try {
    (async () => {
      const res = await axios.post(
        `${CONSTANT.SERVER_ADRESS}/profile/diary`,
        { content: diary.value },
        { headers: { "access-token": localStorage.accessToken } }
      );
    })();
    alert("등록 되었습니다!");
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
    console.log(err.response.status);
  }
};

logout.onclick = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "../Login/Login.html";
};
const load = async () => {
  try {
    const { data } = await axios.get(`${CONSTANT.SERVER_ADRESS}/profile`, {
      headers: { "access-token": localStorage.accessToken },
    });
    console.log(data);
    if(data.goal === null){
     const MakeNewGoal =  document.createElement('div');
     MakeNewGoal.innerHTML = "새 목표 설정하기";
     MakeNewGoal.classList.add('MakeNewObjBtn');
     successObj.appendChild(MakeNewGoal);
     MakeNewGoal.onclick=()=>{ window.location.href = "../Goal/Goal.html"}
    }
    const splitDeadline = data.goal.deadline.split("-");
    term.innerText = `${splitDeadline[0]}년 ${splitDeadline[1]}월 ${splitDeadline[2]}일까지`;
    username.innerText = `${data.name} 님의 목표`;
    goal.innerText = data.goal.todo;
    if (data.diary != null) {
      diaryView.innerText = data.diary.content;
    }
    data.checks.reverse().forEach(({ check }, index) => {
      check && CheckToDo[index].classList.add("active");
    });
    const Time = data.time.split(":");
    time.value = Time[0];
    minutes.value = Time[1];
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
    console.log(err.response.status);
  }
};
window.onload = load;
