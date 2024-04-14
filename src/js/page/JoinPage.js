class JoinPage extends WebPage{
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
        

        <div class="text-center">
            <p class="page-name">회원가입</p>
            <div class="input-wrapper">
                <p class="input-name">이메일</p>
                <div class="text-center" style="position:relative;">
                    <input type="email" class="email-input" placeholder="이메일" required>
                    <button class="email-auth-button">인증번호 전송</button>
                </div>
                <p class="warning-text">⚠️  중복 이메일입니다. 다시 입력해주세요.</p>
            </div>

            <div>
                <p class="input-name">이메일 인증</p>
                <div style="position:relative;">
                    <input class="email-input" style="width:55vw; margin-left:6.511vw;" placeholder="인증번호" required>
                    <button class="email-auth-button" style="left:51vw;right:unset;padding:0 6.4vw;">확인</button>
                    <button class="email-auth-button" style="padding:0 6.4vw;">재전송</button>
                </div>
                <p class="warning-text">⚠️  인증번호가 틀렸습니다. 다시 시도해주세요.</p>
            </div>

            <div>
                <p class="input-name">비밀번호</p>
                <input type="password" class="password-input" id="pw1" name="password" placeholder="비밀번호" required><br>
                <p class="warning-text">⚠️  조건에 맞추어 입력해주세요.</p>
            </div>

            <div>
                <p class="input-name">비밀번호 확인</p>
                <input type="password" class="password-input" id="pw2" name="password" placeholder="비밀번호 확인" required><br>
                <p class="warning-text">⚠️  비밀번호가 일치하지 않습니다.</p>
            </div>

            <div class="text-center" style="margin-top:145px;">
                <button class="login-button">회원가입</button><br>
            </div>
        </div>


        `);



        this.addEvent(".back-button","click",()=>{
            manager.setPage("main")
        })
        return this.container;
    }
}