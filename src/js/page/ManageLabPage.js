class ManageLabPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="overlay display-none"></div>
        <div class="modal-component-wrapper"></div>
        <div id="topbar-component"></div>
        <div class="background"></div>
        <div class="flex-center">
            <div class="wrapper">
                <p style="color:#6B7684; font-size:18px; margin-left:40px;margin-bottom:15px;">관리할 연구실을 선택하세요</p>
                <div class="manage-lab-component-wrapper"></div>
            </div>
        </div>
        `);

        //top bar
        this.get("#topbar-component").appendChild(topbarComponent("연구실 관리", "main-page"))

        //modal
        const modalComponentWrapper = this.get(".modal-component-wrapper");
        const [modal, openModal, closeModal] = modalComponent();
        modalComponentWrapper.appendChild(modal);
        const showDeleteModal=()=>{
            openModal(`<p>이 실습자를 삭제하겠습니까?</p>`,
            ["확인", "등록하기"],
            [()=>{closeModal()},()=>{}])
        }

        //manage lab
        const manageLabComponentWrapper = this.get(".manage-lab-component-wrapper");
        const [manageLabComp,addMemberList,addWaitList] = manageLabComponent("전자재료 연구실","ID 073294","전북대학교","소프트웨어공학과","공대 5호관 507호")
        manageLabComponentWrapper.appendChild(manageLabComp);

        const [manageLabComp2,addMemberList2,addWaitList2] = manageLabComponent("운영체제 연구실","ID 073293","전북대학교","소프트웨어공학과","공대 5호관 507호")
        manageLabComponentWrapper.appendChild(manageLabComp2);
        
        return this.container;
    }
}