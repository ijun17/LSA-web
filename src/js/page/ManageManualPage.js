class ManageManualPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div id="topbar-component"></div>
        <div class="flex-center">
            <div class="wrapper">
                <div id="research-selection-button-list"></div>
                <div id="manual-selection-button-list"></div>
                <div id="manual-panel">
                    <p>안내 오브젝트를 수정하려면 아래 버튼을 클릭해주세요</p>
                    <div><button id="next-button">설정</button></div>
                </div>
            </div>
        </div>
        `);
        this.get("#topbar-component").appendChild(topbarComponent("매뉴얼 설정", "main-page"))

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
                "매뉴얼 선택",
                `설정할 <span class="main-color">매뉴얼</span>을 선택하세요.`,
                `선택한 <span class="main-color">매뉴얼</span>`,
                true,
                true)
            manualDrobdownWrapper.innerHTML = ""
            manualDrobdownWrapper.appendChild(manualDropdown)
            let manualList=[{name:"진공기기"}, {name:"열전도기기"}, {name:"온도계 챔버"}]
            for(let i=0; i<manualList.length; i++){
                addManualOption(i, manualList[i].name,"",()=>{
                    this.get("manual-panel").classList.remove("display-none")
                })
            }
        }

        this.addEvent("#next-button","click",()=>{
            window.location.href = "uniwebview://host?param1=value1&param2=value2"
        })

        
        return this.container;
    }
}
