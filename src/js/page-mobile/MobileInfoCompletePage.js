class MobileInfoCompletePage extends WebPage{
    constructor(){
        super()
    }
    init(manager,param={name:"김순태"}){
        this.setInnerHTML(`
        <div class="flex-center">
            <div class="mobile-wrapper">
                <p class="mobile-login-text" style="margin-top:115px;">${param.name}님, 환영합니다! 🤗</p>
                <p class="mobile-info-input-text" style="margin-top:17px;">모든 인적사항이 설정되었어요.</p>
                <p class="mobile-info-input-text"><span style="color:var(--main-color);">LSA</span>와 함께<br>안전한 연구되시길 바랍니다.</p>

                <div class="text-center" style="margin-top:47px;">
                    <image class="mobile-login-logo" src="src/assets/images/logo.png" style="width:388px;max-width:100vw"><br>
                    <button class="mobile-login-button">연구 시작하기</button><br>
                </div>
            </div>
        </div>
        
        `);

        this.addEvent(".mobile-login-button","click",()=>{
            manager.setPage("mobile-login")
        })
        return this.container;
    }
}