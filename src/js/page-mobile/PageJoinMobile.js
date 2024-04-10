class PageJoinMobile extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <button class="mobile-back-button"><image src="src/assets/images/back.png"></button>
        <p class="mobile-login-text" style="margin-bottom:50px;">회원가입</p>
        <div class="text-center">
            <input type="email" class="mobile-email-input" name="email" placeholder="이메일" required><br>
        </div>
        <p class="mobile-warning-text">⚠️  중복 이메일입니다. 다시 입력해주세요.</p>
        <div class="text-center">
            <input type="password" class="mobile-password-input" id="pw1" name="password" placeholder="비밀번호" required><br>
            <input type="password" class="mobile-password-input" id="pw2" name="password" placeholder="비밀번호 확인" required><br>
        </div>
        <p class="mobile-warning-text" id="warnPw">⚠️  비밀번호가 일치하지 않습니다.</p>
        <div class="text-center" style="margin-top:47px;">
            <button class="mobile-login-button">회원가입</button><br>
        </div>
        
        `);

        const warnPw = this.get("#warnPw");

        this.addEvent("#pw1","input",()=>{
            const pw1 = this.get("#pw1").value;
            const pw2 = this.get("#pw2").value;
            warnPw.style.visibility = (pw1 != pw2?"visible":"hidden")
        })

        this.addEvent("#pw2","input",()=>{
            const pw1 = this.get("#pw1").value;
            const pw2 = this.get("#pw2").value;
            warnPw.style.visibility = (pw1 != pw2?"visible":"hidden")
        })

        this.addEvent(".mobile-back-button","click",()=>{
            manager.setPage("mobile-login")
        })

        this.addEvent(".mobile-login-button","click",()=>{
            manager.setPage("mobile-info")
        })
        return this.container;
    }
}