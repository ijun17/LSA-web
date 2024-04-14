class LoginPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="top-bar">
            <div class="top-bar-left-wrapper">
                <button class="back-button">
                    <image src="src/assets/images/back2.png" style="height:100%;">
                </button>
            </div>
            <div class="top-bar-lsa-wrapper">
                <image class="top-bar-lsa-text" src="src/assets/images/LSA.png">
            </div>
        </div>

        <div class="text-center flex-center">
            <p class="page-name">로그인</p>
            <p class="input-name" style="margin-bottom:10vh;">계정이 없으신가요?  <span class="join-link">회원가입</span></p>
            <div class="input-wrapper">
                <p class="input-name">이메일</p>
                <input type="email" class="input" name="email" placeholder="example@lsamail.com" required><br>
            </div>
            <div class="input-wrapper">
                <p class="input-name">비밀번호</p>
                <input type="password" class="input" name="password" placeholder="영문/숫자 2가지 이상, 8자 이상 32자 이하" required><br>
                <p class="warning-text">⚠️  등록되지 않은 사용자이거나 이메일 또는 비밀번호가 틀렸습니다.</p>
            </div>
            <button class="login-page-login-button" style="margin-top:10vh;font-size:26px;">로그인</button>
        </div>
        `);

        this.addEvent(".join-link","click",()=>{
            manager.setPage("join")
        })


        this.addEvent(".back-button","click",()=>{
            manager.setPage("main")
        })
        return this.container;
    }
}