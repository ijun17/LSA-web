class RestApi{
    serverAddress="https://lsa.kgyuho.dev"

    constructor(){
        let token = localStorage.getItem("token")
        if(token=="null" || token==undefined){
            this.removeToken()
            this.removeUserId()
        }
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

    delete(dir, auth = false) {
        const headers = {};
        if (auth) headers['Authorization'] = `Bearer ${this.getAuthToken()}`;

        return fetch(this.serverAddress + dir, {
            method: 'DELETE',
            headers,
        });
    }

    async handleResponse(promise, handler=()=>{}, errorHandler=()=>{}){
        let status=null;
        try{
            const res = await promise;
            status = res.status;
            if(!res.ok)throw new Error(await res.text());
            else{
                const contentType = res.headers.get('Content-Type');
                const data = (contentType && contentType.includes('application/json')) ? await res.json() : await res.text();
                console.log(contentType, data);
                handler(status, data);
            }
            
        }catch(e){ 
            errorHandler(status, e);
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
    setUserId(userId){localStorage.setItem("userId",userId)}
    getUserId(){return localStorage.getItem("userId")}
    removeUserId(){localStorage.removeItem("userId")}

    //1 회원가입
    join({username,password,name,staffId,role,dept}, handler, errorHandler){
        this.checkInput({username,password,name,staffId,role,dept});
        this.handleResponse(promise = this.post("/api/users/register",{username,password,role,staffId,name,dept,labs:[],labNames:[]}), handler, errorHandler)
    }

    //2 이메일 인증
    authEmail({email,code,username,password,name,staffId,role,dept},handler, errorHandler){
        this.checkInput({email,code,username,password,name,staffId,role,dept});
        this.handleResponse(this.post("/api/users/verify",{email,code,userDto:{username,password,name,staffId,role,dept,labs:[],labNames:[]}}), handler, errorHandler)
    }

    //3 로그인
    login({username,password}, handler, errorHandler){
        this.checkInput({username,password});
        this.handleResponse(this.post("/api/users/login",{username, password}), handler, errorHandler)
    }
    
    //로그아웃
    logout(){
        this.removeToken()
        this.removeUserId()
    }

    //4 연구실 가입 신청
    requestJoinLab({labId}, handler, errorHandler){
        this.checkInput({labId});
        const userId = this.getUserId();
        this.handleResponse(this.post(`/api/labs/request-membership?userId=${userId}&labId=${labId}`,{},true), handler, errorHandler)
    }

    //5 연구실 멤버 삭제
    removeLabMember({userId,labId}, handler, errorHandler){
        this.checkInput({userId,labId});
        this.handleResponse(this.delete(`/api/labs/remove-membership?userId=${userId}&labId=${labId}`,true), handler, errorHandler)
    }

    //6 연구실 신청한거 승인/거절
    responseJoinLabReqeust({requestId,accept}, handler, errorHandler){
        this.checkInput({requestId,accept});
        this.handleResponse(this.post(`/api/labs/respond-to-request?requestId=${requestId}&accept=${accept}`,{},true), handler, errorHandler)
    }

    //7 유저의 연구실 신청 내역 조회
    getJoinRequestOfUser({}, handler, errorHandler){
        const userId = this.getUserId();
        this.handleResponse(this.get(`/api/labs/user/${userId}/membership-requests`,true), handler, errorHandler)
    }

    //8 연구실에 소속된 멤버들 조회
    getLabMembers({labId}, handler, errorHandler){
        this.checkInput({labId});
        this.handleResponse(this.get(`/api/labs/${labId}/find-membership`,true), handler, errorHandler)
    }

    //9 연구실에 신청한 유저 조회
    getJoinRequestOfLab({labId}, handler, errorHandler){
        this.checkInput({labId});
        this.handleResponse(this.get(`/api/labs/${labId}/membership-requests`,true), handler, errorHandler)
    }

    //10 유저가 소속된 연구실 조회
    getLabsOfUser({}, handler, errorHandler){
        const userId = this.getUserId();
        this.handleResponse(this.get(`/api/labs/user/${userId}/find-user-labs`,true), handler, errorHandler)
    }
    
    //11 유저 인적사항 조회
    getUserInfo({}, handler, errorHandler){
        const userId = this.getUserId();
        this.handleResponse(this.get(`/api/users/${userId}/find-user-info`,true), handler, errorHandler)
    }

    //12 아이디로 연구실 조회
    getLabInfo({labId}, handler, errorHandler){
        this.checkInput({labId});
        this.handleResponse(this.get(`/api/labs/${labId}/find-labs`,true), handler, errorHandler)
    }

    //13 연구조회
    getResearch({labId}, handler, errorHandler){
        this.checkInput({labId});
        this.handleResponse(this.get(`/api/research/${labId}/find-research`,true), handler, errorHandler)
    }

    //14 연구생성
    createResearch({labId,researchName}, handler, errorHandler){
        this.checkInput({labId,researchName});
        this.handleResponse(this.post(`/api/research/${labId}/create-research`,{researchName},true), handler, errorHandler)
    }

    //15 연구수정
    editResearch({labId,researchId,researchName}, handler, errorHandler){
        this.checkInput({labId,researchId,researchName});
        this.handleResponse(this.post(`/api/research/${labId}/edit-research?researchId=${researchId}`,{researchName},true), handler, errorHandler)
    }

    //16 연구삭제
    removeResearch({labId,researchId}, handler, errorHandler){
        this.checkInput({labId,researchId});
        this.handleResponse(this.delete(`/api/research/${labId}/delete-research?researchId=${researchId}`,true), handler, errorHandler)
    }

    //17 매뉴얼조회
    getManual({researchId}, handler, errorHandler){
        this.checkInput({researchId});
        this.handleResponse(this.get(`/api/research/manual/find-manual?researchId=${researchId}`,true), handler, errorHandler)
    }

    //18 매뉴얼생성
    createManual({labId,researchId,manualName}, handler, errorHandler){
        this.checkInput({labId,researchId,manualName});
        this.handleResponse(this.post(`/api/research/manual/${labId}/create-manual?researchId=${researchId}`,{manualName},true), handler, errorHandler)
    }

    //19 매뉴얼수정
    editManual({manualId,manualName}, handler, errorHandler){
        this.checkInput({manualId,manualName});
        this.handleResponse(this.post(`/api/research/manual/edit-manual?manualId=${manualId}`,{manualName},true), handler, errorHandler)
    }

    //20 매뉴얼삭제
    removeManual({manualId}, handler, errorHandler){
        this.checkInput({manualId});
        this.handleResponse(this.delete(`/api/research/manual/delete-manual?manualId=${manualId}`,true), handler, errorHandler)
    }
}