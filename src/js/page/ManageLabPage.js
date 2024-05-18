class ManageLabPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="overlay display-none"></div>

        <div class="top-bar">
            <div>
                <div><button id="back-button" style="border:none; background-color:unset;"><image src="src/assets/images/back.png" width=25px></button></div>
                <div>연구실 관리</div>
                <div style="width:25px;"></div>
            </div>
        </div>
        
        <div class="flex-center" style="background-color: #F2F4F6; height:100vh; justify-content:flex-start;">
            <div class="wrapper">
                <p style="color:#6B7684; font-size:18px; margin-top:140px;margin-left:40px;">관리할 연구실을 선택하세요</p>
                <div class="lab-list"></div>
            </div>
        </div>
        `);

        this.loadLabList([{name:"순태랩", id:"ID 073294", univ:"전북대학교", major:"소프트웨어공학과", location:"공대 5호관 507호"}]);

        this.addEvent("#back-button", "click", ()=>{webPageManager.setPage("main-page")})

        return this.container;
    }

    loadLabList(labInfos){
        let html=""
        for(let labInfo of labInfos){
            html+=`
            <div>
                <div class="space-between">
                    <div class="space-between">
                        <div style="color:#505F74; font-size:19px; font-weight:bold; margin-right:10px;">${labInfo.name}</div>
                        <div style="color:#6B7684; font-size:15px;">${labInfo.id}</div>
                    </div>
                    <div><button>선택</button></div>
                </div>
                <div style="color:#6B7684;font-size:16px;">${labInfo.univ} | ${labInfo.major} | ${labInfo.location}</div>
            </div>`
        }
        this.get(".lab-list").innerHTML = html;
    }
}