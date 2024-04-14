class MobileMainPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="overlay display-none">
            <div class="mobile-error-modal">
                <div>오류</div>
                <div>연구실의 소속되어 있지 않습니다.</div>
                <div><span style="color:var(--main-color);">연구실 소속</span>을 등록하고,<br>다시 시도해주세요.</div>
                <div>
                    <button>확인</button>
                    <button>등록하기</button>
                </div>
            </div>
        </div>

        <div>
        
        </div>

        <div class="mobile-top-bar">
            <div>
                <div class="mobile-select-lab">
                    <div class="mobile-lab-name">연구실을 설정해주세요. </div>
                    <image src="src/assets/images/토글 아이콘.png" width=10px height=6.26px> 
                </div>
                <div class="mobile-mini-profile">
                    <image src="src/assets/images/사람 아이콘.png" width=51px style="margin-right:10px;">
                    <div>
                        <div class="mobile-duty">전문 연구자</div>
                        <div class="mobile-name">김순태</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-center" style="background-color: #F2F4F6; height:100vh; justify-content:flex-start;">
            <div class="mobile-wrapper">
                

                <div class="mobile-greeting">김순태님, 안녕하세요  🥽</div>
                <div class="mobile-safe-greeting">오늘도 <span style="color:var(--main-color)">안전한 연구</span> 되시길 바랍니다.</div>

                <div class="mobile-lab-manage">
                    <div>
                        <image src="src/assets/images/연구실 아이콘.png" width=90px>
                        <div>
                            <div style="font-size:19px; font-weight:bold; color: #505F74"; >연구실 관리</div>
                            <div style="font-size:16px; color: #6B7684"; >새로 들어온 신청</div>
                        </div>
                    </div>
                    <image src="src/assets/images/_화살표 아이콘.png" width=15px height=15px style="margin-right:20px;">
                </div>

                <div class="mobile-main-button-wrapper">
                    <button><image src="src/assets/images/4.png" width=116px><div>실습하기</div></button>
                    <button><image src="src/assets/images/5.png" width=116px><div>메뉴얼 설정</div></button>
                </div>
            </div>
        </div>
        `);

        // this.addEvent(".mobile-login-button","click",()=>{
        //     manager.setPage("mobile-login")
        // })
        return this.container;
    }
}