class ManageManualPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="flex-center">
            <div class="wrapper">
                <button class="back-button"><image src="src/assets/images/back.png" width=25px></button>
                <p class="main-text1" style="margin-left:56px;margin-top:10px;margin-bottom:10px;">매뉴얼 설정</p>
                <div id="research-selection-button-list"></div>
                <div id="manual-selection-button-list"></div>
            </div>
        </div>
        `);

        const researchDropdownWrapper = this.get("#research-selection-button-list")
        const manualDrobdownWrapper = this.get("#manual-selection-button-list")

        const [researchDropdown, addResearchOption] = dropdownComponent(
            "연구 선택",
            `설정할 <span class="main-color">연구</span>를 선택하세요`,
            `선택한 <span class="main-color">연구</span>`,
            true,
            true)
        researchDropdownWrapper.appendChild(researchDropdown)
        // researchDropdown.querySelector(".selected-option-preview").addEventListener("click",(e)=>{
        //     if(e.target.classList.contains("option")){
        //         manualDrobdownWrapper.innerHTML = ""
        //     }
        // })

        let researchList=[{name:"디스플레이 신소재 개발"}, {name:"디스플레이 신소재 실험"}, {name:"딥러닝 기반 이미지 인식"}]
        for(let i=0; i<researchList.length; i++){
            addResearchOption(i, researchList[i].name, "이 연구는 디스플레이 신소재에 대해 경도, 환경을 실험해서 안정성을 테스트합니다.", ()=>{
                createManualList()
            })
        }


        let createManualList=(expID)=>{
            const [manualDropdown, addManualOption] = dropdownComponent(
                "매뉴얼",
                `설정할 <span class="main-color">매뉴얼</span>을 선택하세요.`,
                `선택한 <span class="main-color">매뉴얼</span>`,
                true,
                true)
            manualDrobdownWrapper.innerHTML = ""
            manualDrobdownWrapper.appendChild(manualDropdown)
            let manualList=[{name:"진공기기"}, {name:"열전도기기"}, {name:"온도계 챔버"}]
            for(let i=0; i<manualList.length; i++){
                addManualOption(i, manualList[i].name,"",()=>{})
            }
        }
        
        this.addEvent(".back-button", "click", ()=>{webPageManager.setPage("main-page")})

        
        return this.container;
    }
}
