class MainPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="top-bar">
            <div></div>
            <div class="top-bar-lsa-wrapper">
                <image class="top-bar-lsa-text" src="src/assets/images/LSA.png">
            </div>
        </div>

        <div class="text-center">
            <image class="lsa-logo" src="src/assets/images/logo.png">
            <p class="main-page-text1">안전한 연구를 꿈꾸는<br>연구실 보조 매니지먼트 시스템</p>
            <image class="lsa-full-text" src="src/assets/images/LSA-full.png">
        </div>
        <div style="display:flex;justify-content: center;">
            <button class="big-button" id="login-button">로그인</button><br>
            <button class="big-button" id="join-button">회원가입</button>
        </div>


        `);
        this.addEvent("#login-button","click",()=>{
            manager.setPage("login")
        })
        this.addEvent("#join-button","click",()=>{
            manager.setPage("join")
        })
        return this.container;
    }
}