class PageLoginMobile extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <p class="mobile-login-text">안전한 연구를 꿈꾸는<br>연구실 보조 매니지먼트 시스템</p>
        <image class="mobile-login-lsa" src="src/assets/images/LSA.png"><br>
        <div class="text-center">
            <input type="email" class="mobile-email-input" name="email" placeholder="이메일" required><br>
            <input type="password" class="mobile-password-input" name="password" placeholder="비밀번호" required><br>
            <button class="mobile-login-button">로그인</button><br>
            <button class="mobile-join-button">회원가입</button>
        </div>
        `);
        // this.addEvent(".mobile-email-input",)
        this.addEvent(".mobile-join-button","click",()=>{
            manager.setPage("mobile-join")
        })
        return this.container;
    }
}