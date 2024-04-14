class MobileJoinCompletePage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="flex-center">
            <div class="mobile-wrapper">
                <p class="mobile-login-text" style="margin-top:115px;">축하합니다! 🎉</p>
                <p class="mobile-info-input-text" style="margin-top:17px;">회원가입이 완료되었어요.</p>

                <div class="text-center" style="margin-top:615px;">
                    <button class="mobile-login-button">로그인 창으로</button><br>
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