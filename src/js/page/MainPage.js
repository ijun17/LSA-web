class MainPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="bottom-sheet-overlay overlay display-none"></div>
        <div class="background"></div>
        <div class="modal-component-wrapper"></div>
        ${this.topBar()}
        <div class="user-info-wrapper"></div>
        <div class="lab-info-wrapper"></div>
        <div class="flex-center">
            <div class="wrapper">
                <div class="greeting"></div>
                <div class="safe-greeting">오늘도 <span style="color:var(--main-color)">안전한 연구</span> 되시길 바랍니다.</div>
                <div class="researcher-panel display-none">${this.user1Buttons()}</div>
                <div class="student-panel display-none">${this.user2Buttons()}</div>
            </div>
        </div>
        `);
        
        //모달 컴포넌트
        const modalComponentWrapper = this.get(".modal-component-wrapper");
        const [modal, openModal, closeModal] = modalComponent();
        modalComponentWrapper.appendChild(modal);
        function showErrorModal(){
            openModal(
                `<h1>오류</h1><p><span class="main-color">연구실</span>을 선택해주세요.</p>`,
                ["확인", "선택하기"],
                [()=>{closeModal()},()=>{closeModal();openLabInfoBottomSheet();}])
        }


        // 사용자 정보 바텀 시트 컴포넌트
        const [userInfoBottomSheet, setUserInfoBottomSheet, openUserInfoBottomSheet]=createUserInfoBottomSheetComponent();
        this.get(".user-info-wrapper").appendChild(userInfoBottomSheet);
        this.addEvent(".mini-profile","click",openUserInfoBottomSheet)
        REST.getUserInfo({}, (status, data)=>{
            data.role = data.role=="RESEARCHER" ? "전문연구자" : "실습자"
            setUserInfoBottomSheet(data)
            this.get(".greeting").innerText = data.name+"님, 안녕하세요  🥽"
            this.get(".top-bar .name").innerText = data.name;
            this.get(".top-bar .role").innerText = data.role;
            localStorage.setItem("role",data.role)

            if(data.role == "전문연구자")this.get(".researcher-panel").classList.remove("display-none")
            else this.get(".student-panel").classList.remove("display-none")
        },(status, data)=>{
            if(status===401){
                webPageManager.setPage("login-page")
                REST.logout()
                localStorage.removeItem("selectedLabID")
                localStorage.removeItem("role")
            }
        })

        // 연구실 바텀 시트
        const [labInfoBottomSheet, selectLab, openLabInfoBottomSheet]=createLabInfoBottomSheetComponent((id, name)=>{
            this.get(".lab-name").innerText=name;
        })
        this.get(".lab-info-wrapper").appendChild(labInfoBottomSheet);
        this.addEvent(".select-lab","click",openLabInfoBottomSheet);

        // 이벤트
        this.addEvent(".lab-manage","click",()=>{webPageManager.setPage("manage-lab-page")})
        this.addEvent("#experiment-button","click",()=>{if(!localStorage.getItem("selectedLabID")){showErrorModal();return;}webPageManager.setPage("experiment-page")})
        this.addEvent("#manual-button","click",()=>{if(!localStorage.getItem("selectedLabID")){showErrorModal();return;}webPageManager.setPage("manage-manual-page")})

        this.addEvent(".student-button", "click", ()=>{if(!localStorage.getItem("selectedLabID")){showErrorModal();return;}webPageManager.setPage("experiment-page")})
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
                        <div class="role"></div>
                        <div class="name"></div>
                    </div>
                </div>
            </div>
        </div>`
    }

    // 전문 연구자 버튼 - 연구실 관리, 실습하기, 메뉴얼 설정
    user1Buttons(){
        return /*html*/`
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
                <button id="manual-button"><img src="src/assets/images/5.png" width=116px/><div>메뉴얼 설정/검색</div></button>
            </div>
        `
    }

    // 실습자 버튼
    user2Buttons(){
        return `
            <div class="student-button">
                <div>
                    <div>실습하기</div>
                    <div>연구에 도움을 받아보세요</div>
                </div>
                <img src="src/assets/images/4.png" width=170px height=170px/>
            </div>
        `
    }
}