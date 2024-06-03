class REST{
    static serverAddress=""
    static jwt=null
    static post(dir, body, auth=false){
        let data = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
        if(auth)data.headers['Authorization']=`Bearer ${token}`
        return fetch(dir, data)
    }
    static get(dir, auth=false){
        let data = {
            method: 'GET'
        }
        if(auth)data.headers={'Authorization':`Bearer ${token}`}
        return fetch(dir, data)
    }
    static setAuthToken(token){
        localStorage.setItem("token",token)
    }
    static getAuthToken(){
        return localStorage.getItem("token")
    }



    //로그인
    static login(username,password){
        return REST.post("/api/users/login",{username,password})
    }
    
    //로그아웃
    static logout(){
        REST.setAuthToken(null)
    }

    //회원가입
    static join(username,password,name,staffId,role){
        return REST.post("/api/users/register",{username,password,role,staffId,name,labs:[],labNames:[]})
    }

    //이메일 인증
    static join_email(email,code,username,password,name,staffId,role){
        return REST.post("/api/users/verify",{email,code,userDto:{username,password,role,staffId,name,labs:[],labNames:[]}})
    }

    //연구실 들어가기
    static requestLabMember(userId, labId){
        return REST.post(`/api/labs/request-membership?userId=${userId}&labId=${labId}`,{},true)
    }

    //연구실 멤버 삭제
    static deleteLabMember(userId, labId){
        return REST.post(`/api/labs/remove-membership?userId=${userId}&labId=${labId}`,{},true)
    }

    //연구실 신청한거 요청 처리
    static manageLabRequest(requestId,accept=0){
        return REST.post(`/api/labs/respond-to-request?requestId=${requestId}&accept=${accept}`,{},true)
    }

    //연구실에 신청한 유저 조회
    static getLabJoinRequests(labId){
        return REST.get(`/api/labs/${labId}/membertship-request`,true)
    }

    //연구실 멤버 조회
    static getLabMembers(labId){
        return REST.get(`/api/labs/${labId}/find-membership`,true)
    }

    //소속된 연구실 조죄
    static getLabsOfUser(userId){
        return REST.get(`/api/labs/user/${userId}/find-user-labs`,true)
    }

    //사용자 정보 불러오기
    static getUserInfo(userId){
        return REST.get(`/api/user/${userId}/find-user-info`,true)
    }

    //아이디로 연구실 조회
    static getLabById(labId){
        return REST.get(`/api/labs/${labId}/find-labs`,true)
    }
}