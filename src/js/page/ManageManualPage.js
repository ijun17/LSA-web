class ManageManualPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div id="topbar-component-wrapper"></div>
        <div class="modal-component-wrapper"></div>
        <div class="flex-center">
            <div class="wrapper">
                <div id="research-selection-button-list"></div>
                <div id="manual-selection-button-list"></div>
                <div id="manual-panel" class="display-none">
                    <p>안내 오브젝트를 수정하려면 <br>아래 버튼을 클릭해주세요</p>
                    <div><button id="next-button">설정</button></div>
                </div>
            </div>
        </div>
        `);
        const tobbarComponentWrapper = this.get("#topbar-component-wrapper")
        const modalComponentWrapper = this.get(".modal-component-wrapper")
        const researchDropdownWrapper = this.get("#research-selection-button-list")
        const manualDrobdownWrapper = this.get("#manual-selection-button-list")

        tobbarComponentWrapper.appendChild(topbarComponent("매뉴얼 설정", "main-page"))

        const [modal, openModal, closeModal] = modalComponent();
        modalComponentWrapper.appendChild(modal);

        const [researchDropdown, addResearchOption] = dropdownComponent(
            "연구 선택",
            `설정할 <span class="main-color">연구</span>를 선택하세요`,
            `선택한 <span class="main-color">연구</span>`,
            true,
            true)
        researchDropdownWrapper.appendChild(researchDropdown)

        let researchList=[{name:"디스플레이 신소재 개발"}, {name:"디스플레이 신소재 실험"}, {name:"딥러닝 기반 이미지 인식"}]
        for(let i=0; i<researchList.length; i++){
            addResearchOption(i, researchList[i].name, "이 연구는 디스플레이 신소재에 대해 경도, 환경을 실험해서 안정성을 테스트합니다.", ()=>{
                createManualList()
                this.get("#manual-panel").classList.add("display-none")
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
                    this.get("#manual-panel").classList.remove("display-none")
                })
            }
        }

        this.addEvent("#next-button","click",()=>{
            if(isApp())window.location.href = "uniwebview://onAREditmanual?id=1"
            else openModal(`<p>AR환경을 실행하기 위해서는<br>앱을 다운받아 주세요</p>`,["확인"],[()=>{closeModal()}])
        })

        
        return this.container;
    }
}
