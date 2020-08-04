
const Goal = document.getElementById("Goal");
const term = document.getElementById("term");
const setTime = document.getElementById("SetTime");
const btn = document.getElementById("btn");


btn.onclick = async ()=>{
    const setTime = SetTime.value;
    const goal = Goal.value;

    const todayKorean = new Date();
    const today = new Date(todayKorean.getFullYear(),todayKorean.getMonth()+1,todayKorean.getDate());

    const date = term.value;
    let dateArr = [];
    dateArr = date.split("-"); 
    
    const goalYear = dateArr[0];
    const goalMonth = dateArr[1];
    const goalDay = dateArr[2];

    const futurekKorean  = new Date(dateArr[0],dateArr[1],dateArr[2]);

    const resultDay = Math.ceil((futurekKorean .getTime() -today.getTime()) / (1000 * 3600 * 24));

    try{
        const res = await axios({
        method:'post',
        url: `${CONSTANT.SERVER_ADRESS}/goal`,
        headers : {
            access_token : localStorage.access_token,
        },
        data : {
            year : goalYear,
            month : goalMonth,
            day : goalDay,  
            what : goal,
            left : resultDay 
            }
        })
        if(res.status === 200){
            location.href = "../Main/LoginStateMainUI.html";
        }
        else if(res.status === 500){
            console.log('실패');
        }
        else if(res.status){

        }
    }catch(err) {
        console.log(err);
    }
 
};
