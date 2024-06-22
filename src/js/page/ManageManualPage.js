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
        let selectedResearchId;
        let selectedManualId;

        const tobbarComponentWrapper = this.get("#topbar-component-wrapper")
        const modalComponentWrapper = this.get(".modal-component-wrapper")
        const researchDropdownWrapper = this.get("#research-selection-button-list")
        const manualDrobdownWrapper = this.get("#manual-selection-button-list")
        const manualPanel = this.get("#manual-panel")

        tobbarComponentWrapper.appendChild(topbarComponent("매뉴얼 설정", "main-page"))

        const [modal, openModal, closeModal] = modalComponent();
        modalComponentWrapper.appendChild(modal);

        //연구 선택 컴포넌트
        const labId = localStorage.getItem("selectedLabID")
        const [researchDropdown] = dropdownResearchComponent(labId, true, (data)=>{
            selectResearch(data.id)
        })
        researchDropdownWrapper.appendChild(researchDropdown)

        
        let selectResearch=(researchId)=>{
            selectedResearchId = researchId
            manualPanel.classList.add("display-none")
            //매뉴얼 선택 컴포넌트
            const [manualDropdown] = dropdownManualComponent(labId, researchId, true, (data)=>{
                selectManual();
            })
            manualDrobdownWrapper.innerHTML=""
            manualDrobdownWrapper.appendChild(manualDropdown)
        }

        let selectManual = (manualId)=>{
            selectedManualId = manualId
            manualPanel.classList.remove("display-none")
        }

        this.addEvent("#next-button","click",()=>{
            if(isApp())window.location.href = `uniwebview://onAREditmanual?token=${REST.getToken()}&manualId=${selectedManualId}`
            else openModal(`<p>AR환경을 실행하기 위해서는<br>앱을 다운받아 주세요</p>`,["확인"],[()=>{closeModal()}])
        })

        
        return this.container;
    }
}
