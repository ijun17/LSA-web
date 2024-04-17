class JoinPage extends WebPage{

    state=0; //

    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="flex-center">
            <div class="wrapper">
                <button class="back-button"><image src="src/assets/images/back.png" width=25px></button>
                <p class="main-text1" style="margin-top:60px;margin-bottom:50px;">회원가입</p>
                <div class="text-center" style="position:relative;">
                    <input type="email" class="main-input" placeholder="이메일" required>
                    <button class="email-auth-button" id="cert-send-button">인증번호 전송</button>
                </div>
                <p class="warning-text hidden" id="email-warning-text">⚠️  중복 이메일입니다. 다시 입력해주세요.</p>

                <div style="position:relative;">
                    <input class="main-input" style="width:64%; margin-left:6.511%;" placeholder="인증번호" required>
                    <button class="email-auth-button"  id="cert-auth-button" style="left:51%;right:unset;width:20%;padding:0;">확인</button>
                    <button class="email-auth-button"  id="cert-resend-button"style="width:20%;padding:0;">재전송</button>
                </div>
                <p class="warning-text hidden" id="cert-warning-text">⚠️  인증번호가 틀렸습니다. 다시 시도해주세요.</p>
                

                <div class="text-center">
                    <input type="password" class="main-input" id="pw1" name="password" placeholder="비밀번호" required><br>
                    <input type="password" class="main-input" id="pw2" name="password" placeholder="비밀번호 확인" required><br>
                </div>
                <p class="warning-text hidden" id="warnPw">⚠️  비밀번호가 일치하지 않습니다.</p>
                <div class="text-center" style="margin-top:145px;">
                    <button class="main-button">회원가입</button><br>
                </div>
            </div>
        </div>
        `);

        let enableEmail=false; //이메일 인증 되었는지
        let samePW=true; // 비밀번호와 비밀번호 확인 똑같은지

        // 비밀번호 비교
        let ckeckPasswordSame=()=>{
            const pw1 = this.get("#pw1").value;
            const pw2 = this.get("#pw2").value;
            if(samePW!=(pw1==pw2))this.get("#warnPw").classList.toggle("hidden")
            samePW=(pw1==pw2)
        }
        let checkEmail

        this.addEvent("#pw1","input",ckeckPasswordSame)
        this.addEvent("#pw2","input",ckeckPasswordSame)

        this.addEvent(".back-button","click",()=>{
            manager.setPage("login-page")
        })

        this.addEvent(".main-button","click",()=>{
            manager.setPage("join-complete-page")
        })
        return this.container;
    }
}