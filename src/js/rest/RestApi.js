class RestApi{
    serverAddress="http://113.198.66.107:8080"

    constructor(){
    }

    post(dir, body, auth = false) {
        const headers = { "Content-Type": "application/json" };
        if (auth) headers['Authorization'] = `Bearer ${this.getAuthToken()}`;

        return fetch(this.serverAddress + dir, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
    }

    get(dir, auth = false) {
        const headers = {};
        if (auth) headers['Authorization'] = `Bearer ${this.getAuthToken()}`;

        return fetch(this.serverAddress + dir, {
            method: 'GET',
            headers,
        });
    }

    async handleResponse(promise, handler=()=>{}, errorHandler=()=>{}){
        let status=null;
        try{
            const res = await promise;
            status = res.status;
            if(!res.ok)throw new Error(await res.text());
            const contentType = response.headers.get('Content-Type');
            const data = (contentType && contentType.includes('application/json')) ? await res.json() : await res.text();
            handler(status, data);
        }catch(e){ 
            errorHandler(status, e);
        }
    }

    async toJson(promise, handler = () => {}, errorHandler = () => {}) {
        try {
            const res = await promise;
            const status = res.status;
            const data = res.ok ? await res.json() : await res.text();
            handler(status, data);
        } catch (e) {
            errorHandler(e);
        }
    }

    async toText(promise, handler = () => {}, errorHandler = () => {}) {
        try {
            const res = await promise;
            const status = res.status;
            const data = await res.text();
            handler(status, data);
        } catch (e) {
            errorHandler(e);
        }
    }

    checkInput(input){
        for(const key in input){
            if(input[key]===undefined)console.error("REST: undefined input error: "+key)
        }
    }

    setAuthToken(token){localStorage.setItem("token",token)}
    getAuthToken(){return localStorage.getItem("token")}
    removeToken(){localStorage.removeItem("token")}
    setUserId(userId){localStorage.setItem("user_id",userId)}
    getUserId(){return localStorage.getItem("user_id")}
    removeUserId(){localStorage.removeItem("user_id")}

    //1 회원가입
    join({username,password,name,staffId,role,dept}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const promise = this.post("/api/users/register",{username,password,role,staffId,name,dept,labs:[],labNames:[]})
        this.toText(promise, handler, errorHandler)
    }

    //2 이메일 인증
    authEmail({email,code,username,password,name,staffId,role,dept},handler, errorHandler){
        this.checkInput(arguments[0]);
        const promise = this.post("/api/users/verify",{email,code,userDto:{username,password,name,staffId,role,dept,labs:[],labNames:[]}})
        this.toText(promise, handler, errorHandler)
    }

    //3 로그인
    login({username,password}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const promise = this.post("/api/users/login",{username, password})
        this.toJson(promise, handler, errorHandler)
    }
    
    //로그아웃
    logout(){
        this.setAuthToken(null)
    }

    //4 연구실 가입 신청
    requestJoinLab({labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const userId = this.getUserId();
        const promise = this.post(`/api/labs/request-membership?userId=${userId}&labId=${labId}`,{},true)
        this.toText(promise, handler, errorHandler)
    }

    //5 연구실 멤버 삭제
    removeLabMember({userId,labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const promise = this.post(`/api/labs/remove-membership?userId=${userId}&labId=${labId}`,{},true)
        this.toText(promise, handler, errorHandler)
    }

    //6 연구실 신청한거 승인/거절
    responseJoinLabReqeust({requestId,accept}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const promise = this.post(`/api/labs/respond-to-request?requestId=${requestId}&accept=${accept}`,{},true)
        this.toText(promise, handler, errorHandler)
    }

    //7 유저의 연구실 신청 내역 조회
    getJoinRequestOfUser({}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const userId = this.getUserId();
        const promise = this.get(`/api/labs/user/${userId}/membertship-requests`,true)
        this.toJson(promise, handler, errorHandler)
    }

    //8 연구실에 소속된 멤버들 조회
    getLabMembers({labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const promise = this.get(`/api/labs/${labId}/find-membership`,true)
        this.toJson(promise, handler, errorHandler)
    }

    //9 연구실에 신청한 유저 조회
    getJoinRequestOfLab({labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const promise = this.get(`/api/labs/${labId}/membertship-request`,true)
        this.toJson(promise, handler, errorHandler)
    }

    //10 유저가 소속된 연구실 조회
    getLabsOfUser({}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const userId = this.getUserId();
        const promise = this.get(`/api/labs/user/${userId}/find-user-labs`,true)
        this.toJson(promise, handler, errorHandler)
    }
    
    //11 유저 인적사항 조회
    getUserInfo({}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const userId = this.getUserId();
        const promise = this.get(`/api/user/${userId}/find-user-info`,true)
        this.toJson(promise, handler, errorHandler)
    }

    //12 아이디로 연구실 조회
    getLabInfo({labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        this.handleResponse(this.get(`/api/labs/${labId}/find-labs`,true), handler, errorHandler)
    }

    //13 연구조회
    getResearch({labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        this.handleResponse(this.get(`/api/labs/${labId}/find-research`,true), handler, errorHandler)
    }

    //14 연구생성
    createResearch({labId,researchName}, handler, errorHandler){
        this.checkInput(arguments[0]);
        this.handleResponse(this.post(`/api/labs/${labId}/create-research`,{researchName},true), handler, errorHandler)
    }

    //15 연구수정
    editResearch({labId,researchId,researchName}, handler, errorHandler){
        this.checkInput(arguments[0]);
        this.handleResponse(this.post(`/api/labs/${labId}/edit-research?researchId=${researchId}`,{researchName},true), handler, errorHandler)
    }

    //16 연구삭제
    removeResearch({labId,researchId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        this.handleResponse(this.post(`/api/labs/${labId}/delete-research?researchId=${researchId}`,{},true), handler, errorHandler)
    }


    //17 매뉴얼조회
    getManual({labId,researchId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        this.handleResponse(this.get(`/api/labs/${labId}/find-manual?researchId=${researchId}`,true), handler, errorHandler)
    }

    //18 매뉴얼생성
    createManual({labId,researchId,manualName}, handler, errorHandler){
        this.checkInput(arguments[0]);
        this.handleResponse(this.post(`/api/labs/${labId}/create-manual?researchId=${researchId}`,{manualName},true), handler, errorHandler)
    }

    //19 매뉴얼수정
    editManual({labId,manualId,researchName}, handler, errorHandler){
        this.checkInput(arguments[0]);
        this.handleResponse(this.post(`/api/labs/${labId}/edit-manual?manualId=${manualId}`,{researchName},true), handler, errorHandler)
    }

    //20 매뉴얼삭제
    removeManual({labId,manualId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        this.handleResponse(this.post(`/api/labs/${labId}/delete-manual?manualId=${manualId}`,{},true), handler, errorHandler)
    }
}