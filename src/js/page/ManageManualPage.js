class ManageManualPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(/* html */`
        <div id="topbar-component-wrapper"></div>
        <div class="modal-component-wrapper"></div>
        <div class="flex-center">
            <div class="wrapper">
                <div id='manual-search-wrapper' class='flex-center'></div>
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

        const manualSearchWrapper = this.get('#manual-search-wrapper');
        const tobbarComponentWrapper = this.get("#topbar-component-wrapper");
        const modalComponentWrapper = this.get(".modal-component-wrapper");
        const researchDropdownWrapper = this.get("#research-selection-button-list");
        const manualDrobdownWrapper = this.get("#manual-selection-button-list");
        const manualPanel = this.get("#manual-panel");

        const topbar = topbarComponent("매뉴얼 설정/검색", "main-page");
        tobbarComponentWrapper.appendChild(topbar);

        const [modal, openModal, closeModal] = modalComponent();
        modalComponentWrapper.appendChild(modal);

        const manualSearch = manualSearchComponent();
        manualSearchWrapper.appendChild(manualSearch);

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
            const [manualDropdown] = dropdownManualComponent(labId, researchId, researchId!==null, (data)=>{
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
