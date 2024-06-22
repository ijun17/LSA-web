class ExperimentPage extends WebPage{
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
                <div id="experiment-panel" class="display-none">
                    <p>실습을 위해 카메라를 작동합니다.<br>매뉴얼 안내대로 잘 이행해주세요.</p>
                    <div><button id="next-button">다음</button></div>
                </div>
            </div>
        </div>
        `);

        let selectedResearchId;
        let selectedManualId;

        const tobbarComponentWrapper = this.get("#topbar-component-wrapper")
        const modalComponentWrapper = this.get(".modal-component-wrapper")
        const researchDropdownWrapper = this.get("#research-selection-button-list")
        const manualDrobdownWrapper = this.get("#manual-selection-button-list")
        const experimentPanel = this.get("#experiment-panel")

        //탑바 컴포넌트
        tobbarComponentWrapper.appendChild(topbarComponent("실습하기", "main-page"))

        //모달 컴포넌트
        const [modal, openModal, closeModal] = modalComponent();
        modalComponentWrapper.appendChild(modal);

        //연구 선택 컴포넌트
        const labId = localStorage.getItem("selectedLabID")
        const [researchDropdown] = dropdownResearchComponent(labId, false, (data)=>{
            selectResearch(data.id)
        })
        researchDropdownWrapper.appendChild(researchDropdown)

        
        let selectResearch=(researchId)=>{
            selectedResearchId = researchId
            experimentPanel.classList.add("display-none")
            //매뉴얼 선택 컴포넌트
            const [manualDropdown] = dropdownManualComponent(labId, researchId, false, (data)=>{
                selectManual();
            })
            manualDrobdownWrapper.innerHTML=""
            manualDrobdownWrapper.appendChild(manualDropdown)
        }

        let selectManual = (manualId)=>{
            selectedManualId = manualId
            experimentPanel.classList.remove("display-none")
        }

        this.addEvent("#next-button","click",()=>{
            if(isApp())window.location.href = `uniwebview://onARmanual?token=${REST.getToken()}&manualId=${selectedManualId}`
            else openModal(`<p>AR환경을 실행하기 위해서는<br>앱을 다운받아 주세요</p>`,["확인"],[()=>{closeModal()}])
        })

        
        return this.container;
    }
}
