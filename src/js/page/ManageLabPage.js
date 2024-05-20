class ManageLabPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="overlay display-none"></div>

        <div id="topbar-component"></div>
        <div class="background"></div>
        <div class="flex-center">
            <div class="wrapper">
                <p style="color:#6B7684; font-size:18px; margin-left:40px;">관리할 연구실을 선택하세요</p>
                <div class="lab-list"></div>
            </div>
        </div>
        `);

        this.loadLabList([{name:"순태랩", id:"ID 073294", univ:"전북대학교", major:"소프트웨어공학과", location:"공대 5호관 507호"}]);

        this.get("#topbar-component").appendChild(topbarComponent("연구실 관리", "main-page"))

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