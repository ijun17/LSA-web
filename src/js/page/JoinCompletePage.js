class JoinCompletePage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="flex-center">
            <div class="wrapper">
                <p class="main-text1" style="margin-top:115px;">축하합니다! 🎉</p>
                <p class="main-text2" style="margin-top:17px;">회원가입이 완료되었어요.</p>

                <div class="text-center" style="margin-top:615px;">
                    <button class="main-button">로그인 창으로</button><br>
                </div>
            </div>
        </div>
        `);

        this.addEvent(".main-button","click",()=>{
            manager.setPage("login-page")
        })
        return this.container;
    }
}