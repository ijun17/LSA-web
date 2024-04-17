class InfoCompletePage extends WebPage{
    constructor(){
        super()
    }
    init(manager,param={name:"김순태"}){
        this.setInnerHTML(`
        <div class="flex-center">
            <div class="wrapper">
                <p class="main-text1" style="margin-top:115px;">${param.name}님, 환영합니다! 🤗</p>
                <p class="main-text2" style="margin-top:17px;">모든 인적사항이 설정되었어요.</p>
                <p class="main-text2" style="font-size:22px;margin-top:72px;"><span style="color:var(--main-color);">LSA</span>와 함께<br>안전한 연구되시길 바랍니다.</p>

                <div class="text-center">
                    <image class="login-logo" src="src/assets/images/logo.png" style="width:388px;max-width:100vw"><br>
                    <button class="main-button" style="margin-top:100px;">연구 시작하기</button><br>
                </div>
            </div>
        </div>
        
        `);

        this.addEvent(".main-button","click",()=>{
            manager.setPage("main-page")
        })
        return this.container;
    }
}