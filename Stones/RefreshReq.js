const RefreshRequest = async () =>{
    try{
        const res = await axios({
        URL : `${CONSTANT}/user/refresh`,
        method : "get",
        header : {
            refresh_token : localStorage.refresh_token
        }
        })
        if(res.status === 200){
            localStorage.removeItem("access_token")
            localStorage.setItem("access_token",res.data.access_token);
        }
        else if(res.status === 403)
            console.log("로그인 안됨")  
    }
    catch(e){
        console.log(e.response.status)
    }
}