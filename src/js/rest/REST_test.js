class REST{
    static async push(data){

    }
    static async get(data){

    }
    //로그인
    static async login(email,pw){
        const LOGIN_SUCCESS = (email == "1234@naver.com" && pw == "1234")
        if(LOGIN_SUCCESS)   return {state:0,token:"1234"} //성공
        else                return {state:1} //실패
    }
    //자동 로그인
    static async token_login(){
        const LOGIN_SUCCESS =  localStorage.get("token") == "1234"
        if(LOGIN_SUCCESS)   return {state:0} //성공
        else                return {state:1} //실패 - 유효하지 않은 토큰 또는 인증기간이 만료된 토큰
    }
    //이메일 인증 번호 발송 요청
    static async join_email_sand(email){
        const checkInvalidEmail = true // 유효하지 않은 이메일 형식인지
        const checkAlreadyExists = email == "1234@naver.com" // 이미 존재하는 이메일 인지
        if(checkInvalidEmail)       return {state:1}
        else if(checkAlreadyExists) return {state:2}
        else                        return {state:0}
    }
    //이메일 인증 번호 확인
    static async join_email_auth(email,certificationNumber){
        const checkCertificationNumber = certificationNumber=="1234"
        if(checkCertificationNumber) return {state:0} // 성공
        else return {state:1} // 실패
    }
    회원가입
    static async join(email,pw){
        return {state:0} //성공
        return {state:1} //실패
    }
    
}