class TestRestApi{
    oasisdb=[
        {email:"1234",password:"1234",name:"김준기",univ:"전북대학교",major:"소프트웨어공학과",duty:1,id:"201911067",}
    ]
    userDb=[
        {userId:11,name:"김준기",univ:"전북대학교",dept:"소프트웨어공학과",role:"RESEARCHER",staffId:"12345",username:"1",password:"1",token:1111},
        {userId:22,name:"김규호",univ:"전북대학교",dept:"소프트웨어공학과",role:"STUDENT",staffId:"12345",username:"2",password:"2",token:2222}
    ]
    labDb=[
        {name:"전자재료 연구실",labId:1}
    ]

    constructor(){
        console.log("use test")
    }

    setAuthToken(token){
        localStorage.setItem("token",token)
    }
    getAuthToken(){
        return localStorage.getItem("token")
    }

    login(para,handler){
        for(let user of this.userDb){
            if(user.username == para.username && user.password == para.password){
                handler(200, {token:user.token,userId:user.userId})
                return;
            }
        }
        handler(401,"invalid id")
    }

    logout(para,handler){

    }

    getUserInfo(para,handler){
        for(let user of this.userDb){
            if(user.username == para.username && user.password == para.password){
                handler(200, {token:user.token,userId:user.userId})
                return;
            }
        }
        handler(401,"invalid id")
    }
}