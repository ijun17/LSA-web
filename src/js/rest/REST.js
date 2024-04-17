class REST{
    static test=true;
    static async push(dir, body){
        if(REST.test)return await Server.push(dir, body)
        else return null
    }
    static async get(dir){
        if(REST.test)return await Server.get(dir)
        else return null
    }
    //로그인
    static async login(email,pw){
        return await REST.post("api/login",{email:email,password:pw})
        // {state:0,token:"1234"} //성공
        // {state:1,token:null} //실패
    }
    //자동 로그인
    static async token_login(accessToken){
        return await REST.get("api/login_token",accessToken)
        // {state:0} //성공
        // {state:1} //실패 - 유효하지 않은 토큰 또는 인증기간이 만료된 토큰
    }
    //회원가입
    static async join(email,pw){
        return await REST.post("api/join",{email:email})
        // {state:0} //성공
        // {state:1} //실패
    }
    //이메일 인증 번호 발송 요청
    static async join_email(email){
        return await REST.post("api/join_email",{email:email})
        //{state:1} //이메일이 존재하지 않거나 형식에 맞지 않음
        //{state:2} // 이메일이 이미 존재
        //{state:0} // 이메일 인증 코드 전송 성공
    }
    //이메일 인증 번호 확인
    static async join_email_auth(email,certificationNumber){
        return await REST.post("api/join_email_auth",{email:email,code:code})
        // {state:0} //이메일 인증 성공
        // {state:1} // 실패
    }

    //사용자 정보 수정
    static async user_info_edit(name,univ,major,duty,id){
        return await REST.post("api/user_info_edit",{name:name,univ:univ,major:major,duty:duty,id:id})
        // {state:0} // 성공
        // {state:1} // 실패
    }
    //사용자 정보 불러오기
    static async user_info(){
        return await REST.get("api/user_info")
        // {state:0,userName:"김준기",univ:"전북대학교",major:"소프트웨어공학과",duty:1,id:"201911067"} // 성공
        // {state:1,userName:null,univ:null,major:null,duty:null,id:null} //실패 - 아직 등록되지 않음
    }
}