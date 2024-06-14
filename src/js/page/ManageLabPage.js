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

        const manageLabComponentWrapper = this.get(".manage-lab-component-wrapper");
        REST.getLabsOfUser({},(status,data)=>{
            for(let lab of data){
                const [manageLabComp] = manageLabComponent(lab.labName,lab.labId,lab.dept)
                manageLabComponentWrapper.appendChild(manageLabComp);
            }
        })
        
        return this.container;
    }
}