class LoginPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="flex-center">
            <div class="wrapper">
                <p class="main-text1">안전한 연구를 꿈꾸는<br>연구실 보조 매니지먼트 시스템</p>
                <img class="login-lsa" src="src/assets/images/LSA.png"/><br>
                <div class="text-center">
                    <input type="email" class="main-input" id="email" placeholder="이메일" required><br>
                    <input type="password" class="main-input" id="password" placeholder="비밀번호" required><br>
                    <button class="main-button login-button">로그인</button><br>
                    <button class="join-button">회원가입</button>
                </div>
            </div>
        </div>
        `);
        let login = ()=>{
            const username = this.get("#email").value
            const password = this.get("#password").value
            REST.login(username,password)
            .then(res=>res.text()).then(res=>console.log(res)).catch(e=>console.log(e))
            //     {
            //     if(code==200){
            //         localStorage.setItem("userId",data.userId);
            //         REST.setAuthToken(data.token);
            //         manager.setPage("main-page")
            //     }
            //     else alert("로그인이 실패하였습니다.")
            // });
            
        }
        
        this.addEvent(".login-button","click",login)
        this.addEvent("#email","keypress",async (e)=>{if(e.keyCode==13)login()})
        this.addEvent("#password","keypress",async (e)=>{if(e.keyCode==13)login()})
        this.addEvent(".join-button","click",()=>{
            manager.setPage("join-page")
        })
        
        return this.container;
    }
}