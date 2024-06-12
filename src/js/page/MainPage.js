class MainPage extends WebPage{
    selectedLabID=null;
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="bottom-sheet-overlay overlay display-none"></div>
        <div class="background"></div>
        <div class="modal-component-wrapper"></div>
        ${this.labBottomSheet()+this.topBar()}
        <div class="user-info-wrapper"></div>
        <div class="flex-center">
            <div class="wrapper">
                <div class="greeting"></div>
                <div class="safe-greeting">오늘도 <span style="color:var(--main-color)">안전한 연구</span> 되시길 바랍니다.</div>
                <div>${this.user1Buttons()}</div>
            </div>
        </div>
        `);

        const modalComponentWrapper = this.get(".modal-component-wrapper");
        const [modal, openModal, closeModal] = modalComponent();
        modalComponentWrapper.appendChild(modal);
        function showErrorModal(){
            openModal(
                `<h1>오류</h1><p>연구실에 소속되어 있지 않습니다.</p><p><span class="main-color">연구실 소속</span>을 등록하고,<br> 다시 시도해주세요.</p>`,
                ["확인", "등록하기"],
                [()=>{closeModal()},()=>{closeModal();showLabBottomSheet();}])
        }

        const labInfos=[
            {name:"전자재료 연구실", id:"ID 073294", univ:"전북대학교", major:"소프트웨어공학과", location:"공대 5호관 507호"},
            {name:"운영체제 연구실", id:"ID 987123", univ:"전북대학교", major:"소프트웨어공학과", location:"공대 5호관 503호"}
        ];


        const [userInfoBottomSheet, setUserInfoBottomSheet, openUserInfoBottomSheet]=createUserInfoBottomSheetComponent();
        this.get(".modal-component-wrapper").appendChild(userInfoBottomSheet);
        this.addEvent(".mini-profile","click",openUserInfoBottomSheet)


        REST.getUserInfo({}, (status, data)=>{
            data.role = data.role=="RESEARCHER" ? "전문연구자" : "실습자"
            setUserInfoBottomSheet(data)
            this.get(".greeting").innerText = data.name+"님, 안녕하세요  🥽"
            this.get(".top-bar .name").innerText = data.name;
            this.get(".top-bar .role").innerText = data.role;
        })

        REST.getLabsOfUser({}, (status, data)=>{

        })


        // 연구실 바텀 시트에 연구실 정보를 생성
        const createLabList=(labInfos)=>{
            let innerHTML="";
            for(let i=0; i<labInfos.length; i++)innerHTML+=this.createLabInfo(labInfos[i]);
            this.get(".lab-list").innerHTML=innerHTML;
        }

        //연구실 선택
        const selectLab=(labID)=>{
            this.selectedLabID = labID;
            const buttons = this.get(".lab-list").querySelectorAll(".lab-select-button")
            for(let btn of buttons){
                if(btn.dataset.id==this.selectedLabID){
                    btn.classList.add("lab-select-button-selected")
                    this.get(".lab-name").innerText=btn.dataset.name;
                } else {
                    btn.classList.remove("lab-select-button-selected")
                }
            }
        }
        createLabList(labInfos)
        selectLab(this.selectedLabID)

        const closeBottomSheet = ()=>{
            this.get(".bottom-sheet-overlay").classList.add("display-none");
            this.get("#lab-bottom-sheet").classList.remove("bottom-sheet-up");
        }

        const showLabBottomSheet = ()=>{
            this.get(".bottom-sheet-overlay").classList.remove("display-none");
            this.get("#lab-bottom-sheet").classList.add("bottom-sheet-up");
        }

        // 바텀 시트 이벤트
        this.addEvent(".select-lab","click",showLabBottomSheet)
        this.addEvent(".bottom-sheet-overlay","click",closeBottomSheet)

        // 랩 선택을 눌렀을때
        this.addEvent(".lab-list","click",(e)=>{ if(e.target.classList.contains("lab-select-button"))selectLab(e.target.dataset.id);})

        // 이벤트
        this.addEvent(".lab-manage","click",()=>{webPageManager.setPage("manage-lab-page")})
        this.addEvent("#experiment-button","click",()=>{if(!this.selectedLabID){showErrorModal();return;}webPageManager.setPage("experiment-page")})
        this.addEvent("#manual-button","click",()=>{if(!this.selectedLabID){showErrorModal();return;}webPageManager.setPage("manage-manual-page")})

        return this.container;
    }
    // 상단바
    topBar(){
        return `
        <div class="top-bar">
            <div>
                <div class="select-lab">
                    <div class="lab-name">연구실을 설정해주세요. </div>
                    <img src="src/assets/images/toggle.png" width=10px height=6.26px style="margin-left:5px;"/> 
                </div>
                <div class="mini-profile">
                    <img src="src/assets/images/profile_image.png" width=51px style="margin-right:10px;"/>
                    <div>
                        <div class="role">전문 연구자</div>
                        <div class="name">김순태</div>
                    </div>
                </div>
            </div>
        </div>`
    }
    //연구실 선택 바텀 시트
    labBottomSheet(){
        return `
        <div class="bottom-sheet" id="lab-bottom-sheet">
            <div>
                <div style="background-color:#e6e6e6;width:15%;height:6.5px;border-radius:3.2px;margin-bottom:30px;"></div>
                <div class="space-between" style="width:100%">
                    <div class="hidden" style="color:#6B7684;font-size:18px;">편집</div>
                    <div style="font-size:22px;font-weight:bold; color:#3F4956">연구실 선택</div>
                    <div class="hidden" style="color:#6B7684;font-size:18px;font-weight:bold;">편집</div>
                </div>
                <div>
                    <img src="src/assets/images/search.png" width=30px height=30px/> 
                    <input placeholder="연구실 검색" id="lab-search">
                </div>
            </div>
            <div class="lab-list">
            </div>
        </div>`
    }
    // 연구실 선택 바텀 시트 내부 연구실 정보
    createLabInfo(labInfo){
        return `
        <div>
            <div class="space-between">
                <div class="space-between">
                    <div style="color:#505F74; font-size:19px; font-weight:bold; margin-right:10px;">${labInfo.name}</div>
                    <div style="color:#6B7684; font-size:15px;">${labInfo.id}</div>
                </div>
                <div><button class="lab-select-button" data-id="${labInfo.id}" data-name="${labInfo.name}"></button></div>
            </div>
            <div style="color:#6B7684;font-size:16px;">${labInfo.univ} | ${labInfo.major} | ${labInfo.location}</div>
        </div>`
    }

    // 전문 연구자 버튼 - 연구실 관리, 실습하기, 메뉴얼 설정
    user1Buttons(){
        return `
            <div class="lab-manage space-between">
                <div>
                    <img src="src/assets/images/lab_icon.png" width=90px/>
                    <div>
                        <div style="font-size:19px; font-weight:bold; color: #505F74"; >연구실 관리</div>
                        <div style="font-size:16px; color: #6B7684"; >새로 들어온 신청</div>
                    </div>
                </div>
                <img src="src/assets/images/arrow.png" width=15px height=15px style="margin-right:20px;"/>
            </div>
            <div class="main-button-wrapper">
                <button id="experiment-button"><img src="src/assets/images/4.png" width=116px/><div>실습하기</div></button>
                <button id="manual-button"><img src="src/assets/images/5.png" width=116px/><div>메뉴얼 설정</div></button>
            </div>
        `
    }
}