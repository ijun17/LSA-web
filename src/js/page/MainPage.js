class MainPage extends WebPage{
    selectLabID=null;
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="overlay display-none"></div>

        ${this.labErrorModal()+this.labBottomSheet()+this.userInfoBottomSheet()+this.topBar()}
        
        <div class="flex-center" style="background-color: #F2F4F6; height:100vh; justify-content:flex-start;">
            <div class="wrapper">
                <div class="greeting">김순태님, 안녕하세요  🥽</div>
                <div class="safe-greeting">오늘도 <span style="color:var(--main-color)">안전한 연구</span> 되시길 바랍니다.</div>
                <div>${this.user1Buttons()}</div>
            </div>
        </div>
        `);

        // 연구실 바텀 시트에 연구실 정보를 생성
        let createLabList=(selectedID="ID 073294",labInfos=[{name:"순태랩", id:"ID 073294", univ:"전북대학교", major:"소프트웨어공학과", location:"공대 5호관 507호"}])=>{
            let innerHTML="";
            for(let i=0; i<labInfos.length; i++)innerHTML+=this.createLabInfo(labInfos[i]);
            this.get(".lab-list").innerHTML=innerHTML;
        }

        //유저 정보 바텀 시트에 유저 정보를 생성
        let createUserInfo = ()=>{
            
        }

        let selectID


        // 프로필을 눌렀을때 이벤트
        this.addEvent(".mini-profile","click",()=>{
            this.get(".overlay").classList.remove("display-none");
            this.get("#user-info-bottom-sheet").classList.add("bottom-sheet-up");
            createUserInfo()
        })

        // 연구실 선택을 눌렀을때 이벤트
        this.addEvent(".select-lab","click",()=>{
            this.get(".overlay").classList.remove("display-none");
            this.get("#lab-bottom-sheet").classList.add("bottom-sheet-up");
            createLabList()
        })
        
        // 연구실 선택 또는 유저 정보 바텀 시트가 떠 있을대 오버레이를 클릭했을때
        this.addEvent(".overlay","click",()=>{
            this.get(".overlay").classList.add("display-none");
            this.get("#lab-bottom-sheet").classList.remove("bottom-sheet-up");
            this.get("#user-info-bottom-sheet").classList.remove("bottom-sheet-up");
        })

        this.addEvent(".lab-manage","click",()=>{
            webPageManager.setPage("manage-lab-page")
        })

        return this.container;
    }
    // 상단바
    topBar(){
        return `
        <div class="top-bar">
            <div>
                <div class="select-lab">
                    <div class="lab-name">연구실을 설정해주세요. </div>
                    <image src="src/assets/images/토글 아이콘.png" width=10px height=6.26px> 
                </div>
                <div class="mini-profile">
                    <image src="src/assets/images/사람 아이콘.png" width=51px style="margin-right:10px;">
                    <div>
                        <div class="duty">전문 연구자</div>
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
                    <div style="font-size:22px;font-weight:bold; color:#3F4956">연구실 설정</div>
                    <div style="color:#6B7684;font-size:18px;">편집</div>
                </div>
                <div>
                    <image src="src/assets/images/search.png" width=30px height=30px> 
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
                <div><button>선택</button></div>
            </div>
            <div style="color:#6B7684;font-size:16px;">${labInfo.univ} | ${labInfo.major} | ${labInfo.location}</div>
        </div>`
    }
    // 유저 정보 바텀 시트
    userInfoBottomSheet(){
        return `
        <div class="bottom-sheet" id="user-info-bottom-sheet">
            <div>
                <div style="background-color:#e6e6e6;width:15%;height:6.5px;border-radius:3.2px;margin-bottom:30px;"></div>
                <div class="space-between" style="width:100%">
                    <div class="hidden"><button style="border:none; background-color:unset;"><image src="src/assets/images/back.png" width=25px></button></div>
                    <div style="font-size:22px;font-weight:bold; color:#3F4956">사용자 정보 설정</div>
                    <div style="width:25px;"></div>
                </div>
            </div>
            <div class="user-info">
                <p>이름</p><div class="text-center"><input class="main-input" id="user-info1" readonly></div>
                <p>직책</p><div class="text-center"><input class="main-input" id="user-info2" readonly></div>
                <p>소속 학교</p><div class="text-center"><input class="main-input" id="user-info3" readonly></div>
                <p>소속 전공</p><div class="text-center"><input class="main-input" id="user-info4" readonly></div>
                <p>학번 / 사번</p><div class="text-center"><input class="main-input" id="user-info5" readonly></div>
            </div>
        </div>`
    }

    // 에러 메시지
    labErrorModal(){
        return `
        <div class="error-modal display-none">
            <div>오류</div>
            <div>연구실의 소속되어 있지 않습니다.</div>
            <div><span style="color:var(--main-color);">연구실 소속</span>을 등록하고,<br>다시 시도해주세요.</div>
            <div>
                <button>확인</button>
                <button>등록하기</button>
            </div>
        </div>`
    }
    // 전문 연구자 버튼 - 연구실 관리, 실습하기, 메뉴얼 설정
    user1Buttons(){
        return `
            <div class="lab-manage space-between">
                <div>
                    <image src="src/assets/images/연구실 아이콘.png" width=90px>
                    <div>
                        <div style="font-size:19px; font-weight:bold; color: #505F74"; >연구실 관리</div>
                        <div style="font-size:16px; color: #6B7684"; >새로 들어온 신청</div>
                    </div>
                </div>
                <image src="src/assets/images/_화살표 아이콘.png" width=15px height=15px style="margin-right:20px;">
            </div>
            <div class="main-button-wrapper">
                <button><image src="src/assets/images/4.png" width=116px><div>실습하기</div></button>
                <button><image src="src/assets/images/5.png" width=116px><div>메뉴얼 설정</div></button>
            </div>
        `
    }
}