class Server{
    // static oasisdb=[
    //     {email:"1234@naver.com",password:"1234",name:"김준기",univ:"전북대학교",major:"소프트웨어공학과",duty:1,id:"201911067",}
    // ]
    // static db=[
    //     {name:"김준기",univ:"전북대학교",major:"소프트웨어공학과",duty:1,id:"201911067"},
    //     {name:"김규호",univ:"전북대학교",major:"소프트웨어공학과",duty:0,id:"201912345"}
    // ]
    static async post(dir, body, cert=false){
        switch(dir){
            case "api/login": return await Server.login(body)
            case "api/join": return await Server.join(body)
            case "api/join_email": return await Server.join_email(body)
            case "api/join_email_auth": return await Server.join_email_auth(body)
            case "api/user_info_edit": return await Server.user_info_edit(body)
            default: console.error("유효하지 않은 api "+dir)
        }
    }
    static async get(dir, auth=false){
        switch(dir){
            case "api/login_token": return await Server.login_token(body)
            case "api/user_info": return await Server.user_info(body)
            default: console.error("유효하지 않은 api "+dir)
        }

    }
    static async login(body){
        const check = (body.email == "1234@naver.com" && body.password == "1234")
        if(check)  return {state:0,accessToken:"1234"} //성공
        else       return {state:1,accessToken:null} //실패-아이디 비번이 유효하지 않음
    }

    static async login_token(body){
        const check = (body.accessToken == "1234")
        if(check)  return {state:0} //성공
        else       return {state:1} //실패-토큰이 유효하지 않거나 만료일이 지남
    }

    static async join(body){
        return {state:0} //회원가입 성공
        return {state:1} //이메일이 안맞거나 패스워트 규정을 맞추지 않음
    }

    static async join_email(body){
        const check1 = (body.email=="")
        const check2 = (body.email=="1234@naver.com") 
        if(check1) return {state:1} //이메일이 존재하지 않거나 형식에 맞지 않음
        else if(check2) return {state:2} // 이메일이 이미 존재
        return {state:0} // 이메일 인증 코드 전송 성공
    }

    static async join_email_auth(body){
        const check = body.code == "1234"
        if(check) return {state:0} //이메일 인증 성공
        else return {state:1} // 실패
    }   

    static async user_info(){
        const check = localStorage.getItem("userinfo")==true
        if(check) return {state:0,userName:"김준기",univ:"전북대학교",major:"소프트웨어공학과",duty:1,id:"201911067"}
        else return {state:1,userName:null,univ:null,major:null,duty:null,id:null}
    }

    static async user_info_edit(body){
        const check = (body.name=="김준기" && body.univ=="전북대학교" && major=="소프트웨어공학과" && duty==1 && id=="201911067")
        if(check) {
            localStorage.setItem("userinfo",true)
            return {state:0}
        } // 성공
        else return {state:1} // 실패-등록되지 않은 사용자
    }
}