class TestRestApi{
    oasisdb=[
        {email:"1234",password:"1234",name:"김준기",major:"소프트웨어공학과",duty:1,id:"201911067",}
    ]
    token = 6;
    userDb=[
        {userId:1,name:"김준기",dept:"소프트웨어공학과",role:"RESEARCHER",staffId:"12345",username:"1",password:"1",token:1},
        {userId:2,name:"김규호",dept:"소프트웨어공학과",role:"STUDENT",staffId:"12445",username:"2",password:"2",token:2},
        {userId:3,name:"김채원",dept:"소프트웨어공학과",role:"STUDENT",staffId:"12245",username:"3",password:"3",token:3},
        {userId:4,name:"정혜선",dept:"소프트웨어공학과",role:"STUDENT",staffId:"13245",username:"4",password:"4",token:4},
        {userId:5,name:"최태운",dept:"소프트웨어공학과",role:"STUDENT",staffId:"22245",username:"5",password:"5",token:5},
    ]
    labDb=[
        {labId:1,labName:"LSA 연구실",dept:"소프트웨어공학과",member:[1,2,3]},
        {labId:2,labName:"Crenu 연구실",dept:"소프트웨어공학과",member:[1]},
        {labId:3,labName:"인공지능 연구실",dept:"소프트웨어공학과",member:[]},
        {labId:4,labName:"운영체제 연구실",dept:"소프트웨어공학과",member:[]},
        {labId:5,labName:"클라우드 연구실",dept:"소프트웨어공학과",member:[]}
    ]
    requestId=5
    requestDb=[
        {requestId:1, userId:4, labId: 1},
        {requestId:2, userId:5, labId: 1},
        {requestId:3, userId:2, labId: 2},
        {requestId:4, userId:3, labId: 2}
    ]
    researchId=3
    researchDb=[
        {researchId:1, labId:1, researchName:"아루코 마커"},
        {researchId:2, labId:1, researchName:"핸드 트래킹"}
    ]
    manualId=5
    manualDb=[
        {manualId:1,researchId:1,manualName:"아루코 마커1"},
        {manualId:2,researchId:1,manualName:"아루코 마커2"},
        {manualId:3,researchId:2,manualName:"핸드 트래킹1"},
        {manualId:4,researchId:2,manualName:"핸드 트래킹2"},
    ]

    currentUserId=1
    currentToken=1
    

    constructor(){
        console.log("REST:TEST")
        console.log("김준기 id:1 / pw:1")
        console.log("김규호 id:2 / pw:2")
    }

    checkInput(input){
        for(const key in input){
            if(input[key]===undefined)console.error("REST: undefined input error: "+key)
        }
    }

    setAuthToken(token){this.currentToken=token}
    getAuthToken(){return this.currentToken}
    removeToken(){this.currentToken=false}
    setUserId(userId){this.currentUserId=userId}
    getUserId(){return this.currentUserId}
    removeUserId(){this.currentUserId = false}

    //완료 6.12
    //1 회원가입
    join({username,password,name,staffId,role,dept}, handler, errorHandler){
        this.checkInput(arguments[0]);
        for(let user of this.userDb){
            if(user.username == username){
                errorHandler(409, "Conflict")
                console.log("회원가입 실패: 동일한 아이디가 있습니다.")
                return;
            }
        }
        handler(200,"sucess")
        console.log("이메일 인증 코드: 0")
    }

    //완료 6.12
    //2 이메일 인증
    authEmail({email,code,username,password,name,staffId,role,dept},handler, errorHandler){
        this.checkInput(arguments[0]);
        if(code=="0"){
            this.userDb.push({userId,name,dept,role,staffId,username,password,token:this.token++})
            handler(200,"sucess")
            return
        }
        errorHandler(400,"fail")
        console.log("이메일 인증 코드: 0")
    }

    //완료 6.12
    //3 로그인 {userId:user.userId, token:user.token}
    login({username,password}, handler, errorHandler){
        this.checkInput(arguments[0]);
        for(let user of this.userDb){
            if(user.username==username && user.password == password){
                handler(200, {userId:user.userId, token:user.token})
                return
            }
        }
        errorHandler(400, "login fail")
    }
    
    //완료 6.12
    //로그아웃
    logout(){
        this.removeUserId()
        this.removeToken()
    }

    //완료 6.12
    //4 연구실 가입 신청 
    requestJoinLab({labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const userId = this.getUserId();
        const lab = this.labDb.find(e=>e.labId == labId)
        if(lab.member.indexOf(userId)<0){
            const requestId = this.requestId++
            this.requestDb.push({userId,labId,requestId})
            handler(200,"sucess")
        }else{
            errorHandler(400,"fail")
        }
        
    }

    //완료 6.12
    //5 연구실 멤버 삭제
    removeLabMember({userId,labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const lab = this.labDb.find(e=>e.labId == labId)
        if(lab){
            const ui = lab.member.indexOf(userId)
            lab.member.splice(ui,1)
            console.log(lab.member)
            handler(200,"sucess")
        }else errorHandler(400,"fail")
    }

    //완료 6.12
    //6 연구실 신청한거 승인/거절
    responseJoinLabReqeust({requestId,accept}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const ri = this.requestDb.findIndex(e=>requestId == e.requestId)
        const req = this.requestDb[ri]
        const lab = this.labDb.find(e=>e.labId == req.labId)
        if(accept==1)lab.member.push(req.userId)
        this.requestDb.splice(ri,1)
        handler(200,"sucess")
    }

    //완료 6.12
    //7 유저의 연구실 신청 내역 조회 [ {name, staffId, role, dept, labId, labName, requestId} ]
    getJoinRequestOfUser({}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const userId = this.getUserId();
        let result = []
        let user = this.userDb.find(ele=>{return ele.userId = userId})
        const name=user.name, staffId=user.staffId, role=user.role, dept=user.dept;
        for(let req of this.requestDb){
            if(req.userId == userId){
                const labId = req.labId;
                const labName = this.labDb[this.labDb.findIndex(ele=>{return ele.labId == req.labId})].labName;
                const requestId = req.requestId
                //RESPONSE
                const RESULT_ELE = {name, staffId, role, dept, labId, labName, requestId}
                result.push(RESULT_ELE)
            }
        }

        handler(200, result)
    }

    //8 연구실에 소속된 멤버들 조회
    getLabMembers({labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        let result = []
        const lab = this.labDb.find(e=>labId == e.labId)
        for(let ui of lab.member){
            let user = this.userDb.find(e=>e.userId == ui)
            const name=user.name, dept=user.dept, userId=user.userId, staffId=user.staffId, role=user.role;
            result.push({userId, name, role, dept, staffId})
        }
        handler(200,result)
    }

    //9 연구실에 신청한 유저 조회
    getJoinRequestOfLab({labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        let result = []
        for(let req of this.requestDb){
            if(req.labId == labId){
                const user=this.userDb.find(e=>e.userId == req.userId)
                const userName=user.name, dept=user.dept, userId=user.userId, staffId=user.staffId, role=user.role, requestId=req.requestId;
                result.push({userName, dept, userId, staffId, role, requestId})
            }
        }
        handler(200, result)
    }

    //10 유저가 소속된 연구실 조회 [{labId, labName, dept}]
    getLabsOfUser({}, handler, errorHandler){
        this.checkInput(arguments[0]);
        
        const userId = this.getUserId();
        const result=[]
        for(let lab of this.labDb){
            if(lab.member.findIndex(ele=>ele==userId)>=0){
                const labId = lab.labId, labName=lab.labName, dept=lab.dept
                result.push({labId, labName, dept})
            }
        }
        handler(200, result)
    }
    
    // 완료 6.12
    //11 유저 인적사항 조회
    getUserInfo({}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const userId = this.getUserId();
        const user = this.userDb.find(ele=>ele.userId==userId)
        if(user){
            const name=user.name, dept=user.dept, role=user.role, staffId=user.staffId
            handler(200,{name,dept,role,staffId})
        }else errorHandler(400,"no user")
    }

    //12 아이디로 연구실 조회
    getLabInfo({labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
        const lab = this.labDb.find(e=>e.labId == labId);
        if(lab){
            const labName = lab.labName, dept=lab.dept
            handler(200,{labName, labId, dept})
        }else{
            errorHandler(404,"no lab")
        }
    }

    //13 연구조회
    getResearch({labId}, handler, errorHandler){
        this.checkInput(arguments[0]);
    }

    //14 연구생성
    createResearch({labId,researchName}, handler, errorHandler){
        this.checkInput(arguments[0]);
    }

    //15 연구수정
    editResearch({labId,researchId,researchName}, handler, errorHandler){
        this.checkInput(arguments[0]);
    }

    //16 연구삭제
    removeResearch({labId,researchId}, handler, errorHandler){
        this.checkInput(arguments[0]);
    }


    //17 매뉴얼조회
    getManual({labId,researchId}, handler, errorHandler){
        this.checkInput(arguments[0]);
    }

    //18 매뉴얼생성
    createManual({labId,researchId,manualName}, handler, errorHandler){
        this.checkInput(arguments[0]);
    }

    //19 매뉴얼수정
    editManual({labId,manualId,researchName}, handler, errorHandler){
        this.checkInput(arguments[0]);
    }

    //20 매뉴얼삭제
    removeManual({labId,manualId}, handler, errorHandler){
        this.checkInput(arguments[0]);
    }
}