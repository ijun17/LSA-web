class ExperimentPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="flex-center">
            <div class="wrapper">
                <button class="back-button"><image src="src/assets/images/back.png" width=25px></button>
                <p class="main-text1" style="margin-left:56px;margin-top:23px;margin-bottom:10px;">실습</p>
                
                
                <div class="flex-center">
                    <p class="main-text2">연구 선택</p>
                    <div class="list">
                        <div>
                            <div>실습할 <span style="color:var(--main-color);">연구</span>를 선택하세요</div>
                            <div><button><image src="src/assets/images/_화살표 아이콘.png" width=15px></button></div>
                        </div>
                        <div class="research-list"></div>
                        <div></div>
                    </div>
                </div>
                <div class="flex-center">
                    <div class="main-text2">연구 선택</div>
                    <div class="list">
                        <div>
                            <div>선택한 연구는 아래 <span style="color:var(--main-color);">메뉴얼</span> 순서대로 진행합니다.</div>
                            <div></div>
                        </div>
                        <div class="manual-list"></div>
                    </div>
                </div>
            </div>
        </div>
        `);
        let selectResearch=()=>{

        }

        let createResearchList=()=>{
            //연구 정보 불러오기
            let researchList=[{name:"디스플레이 신소재 개발"}, {name:"디스플레이 신소재 실험"}, {name:"딥러닝 기반 이미지 인식"}]

            const list = this.get(".research-list")
            let innerHTML = ""
            for(let i=0; i<researchList.length; i++){
                innerHTML+=`<div class="research-button" data-id="${i}">${researchList[i].name}</div>`
            }
            list.innerHTML=innerHTML;
        }

        createResearchList();
        

        let createManualList=(expID)=>{
            let manualList=[{name:"진공기기"},{name:"열전도기기"},{name:"온도계 챔버"}]

            const list = this.get(".manual-list")
            let innerHTML = ""
            for(let i=0; i<manualList.length; i++){
                innerHTML+=`<div class="manual-button" data-id="${i}">${manualList[i].name}</div>`
            }
            list.innerHTML=innerHTML;
        }


        this.addEvent(".research-list","click",(e)=>{
            if(e.target.classList.contains("research-button")){
                createManualList()
            }
        })

        this.addEvent(".back-button", "click", ()=>{webPageManager.setPage("main-page")})

        
        return this.container;
    }
}