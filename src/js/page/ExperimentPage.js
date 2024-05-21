class ExperimentPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div id="topbar-component-wrapper"></div>
        <div class="flex-center">
            <div class="wrapper">
                <div id="research-selection-button-list"></div>
                <div id="manual-selection-button-list"></div>
                <div id="experiment-panel" class="display-none">
                    <p>실습을 위해 카메라를 작동합니다.<br>매뉴얼 안내대로 잘 이행해주세요.</p>
                    <div><button>다음</button></div>
                </div>
            </div>
        </div>
        `);

        const researchDropdownWrapper = this.get("#research-selection-button-list")
        const manualDrobdownWrapper = this.get("#manual-selection-button-list")
        const experimentPanel = this.get("#experiment-panel")

        this.get("#topbar-component-wrapper").appendChild(topbarComponent("실습하기", "main-page"))

        const [researchDropdown, addResearchOption] = dropdownComponent(
            "연구 선택",
            `실습할 <span class="main-color">연구</span>를 선택하세요`,
            `선택한 <span class="main-color">연구</span>`,
            true,true)
        researchDropdownWrapper.appendChild(researchDropdown)
        // researchDropdown.querySelector(".selected-option-preview").addEventListener("click",(e)=>{
        //     if(e.target.classList.contains("option")){
        //         manualDrobdownWrapper.innerHTML = ""
        //         experimentPanel.classList.add("display-none")
        //     }
        // })

        let researchList=[{name:"디스플레이 신소재 개발"}, {name:"디스플레이 신소재 실험"}, {name:"딥러닝 기반 이미지 인식"}]
        for(let i=0; i<researchList.length; i++){
            addResearchOption(i, researchList[i].name, "이 연구는 디스플레이 신소재에 대해 경도, 환경을 실험해서 안정성을 테스트합니다.", ()=>{
                createManualList()
            })
        }


        let createManualList=(expID)=>{
            const [manualDropdown, addManualOption] = dropdownComponent("매뉴얼",`선택한 연구는 아래 <span class="main-color">매뉴얼</span> 순서대로 진행합니다.`,"",false,false)
            manualDrobdownWrapper.innerHTML = ""
            manualDrobdownWrapper.appendChild(manualDropdown)
            let manualList=[{name:"진공기기"}, {name:"열전도기기"}, {name:"온도계 챔버"}]
            for(let i=0; i<manualList.length; i++){
                addManualOption(i, manualList[i].name)
            }

            experimentPanel.classList.remove("display-none")
        }

        
        return this.container;
    }
}
