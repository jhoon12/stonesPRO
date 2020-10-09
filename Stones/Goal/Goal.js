const Goal = document.getElementById("Goal");
const term = document.getElementById("term");
const setTime = document.getElementById("SetTime");
const btn = document.getElementById("btn");

btn.onclick = async (e) => {
  if (Goal.value && term.value && setTime.value) {
    const setTime = SetTime.value;
    const goal = Goal.value;

    const todayKorean = new Date();
    const today = new Date(
      todayKorean.getFullYear(),
      todayKorean.getMonth() + 1,
      todayKorean.getDate()
    );

    const date = term.value;

    let dateArr = [];
    dateArr = date.split("-");

    const futurekKorean = new Date(dateArr[0], dateArr[1], dateArr[2]);
    const resultDay = Math.ceil(
      (futurekKorean.getTime() - today.getTime()) / (1000 * 3600 * 24)
    ); //뺀 시간

    if (futurekKorean.getTime() > today.getTime()) {
      console.log(futurekKorean.getTime() );
      console.log(today.getTime());
      try {
        const res = await axios({
          method: "post",
          url: `${CONSTANT.SERVER_ADRESS}/goal`,
          headers: {
            "access-Token": localStorage.accessToken,
          },
          data: {
            deadline: date,
            todo: goal,
            time: setTime,
            left: resultDay, //
          },
        });
        if (res.status === 200) {
          location.href = "../Main/LoginStateMainUI.html";
        } else if (res.status === 500) {
          console.log("실패");
        } else if (res.status) {
        }
      } catch (err) {
        ErrorHandler(err.response.status, [
          {
            errStatus: 401,
            func: () => {
              alert("세션이 만료되었습니다. 다시 로딩해주세요");
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
    }
    else {console.log(futurekKorean.getTime());
      console.log(new Date().getTime());alert("목표 날짜는 현재 날짜보다 높아야합니다.")}
  } else alert("모든 항목을 입력해주세요!");
};
