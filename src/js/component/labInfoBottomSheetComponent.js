function createLabInfoBottomSheetComponent(handleLabSelected){
    const div = document.createElement("div");
    div.className="lab-info-bottom-sheet-component";
    div.innerHTML=`
        <div class="overlay display-none"></div>
        <div class="modal-wrapper"></div>
        <div class="bottom-sheet">
            <div>
                <div style="background-color:#e6e6e6;width:15%;height:6.5px;border-radius:3.2px;margin-bottom:30px;"></div>
                <div class="space-between" style="width:100%">
                    <div class="hidden" style="color:#6B7684;font-size:18px;">편집</div>
                    <div style="font-size:22px;font-weight:bold; color:#3F4956">연구실 선택</div>
                    <div class="hidden" style="color:#6B7684;font-size:18px;font-weight:bold;">편집</div>
                </div>
                <div>
                    <img src="src/assets/images/search.png" width=30px height=30px/> 
                    <input placeholder="연구실 검색" id="lab-search" type="number" min="0" >
                </div>
            </div>
            <div class="lab-list my-lab-list"></div>
        </div>`

    const overlay = div.querySelector(".overlay")
    const bottomSheet = div.querySelector(".bottom-sheet")
    const labList = div.querySelector(".my-lab-list")
    const labSearchInput = div.querySelector("#lab-search")
    const searchLab = div.querySelector(".search-lab")

    const myLabs=[]

    const [modal, showModal, closeModal] = modalComponent();
    div.querySelector(".modal-wrapper").appendChild(modal)


    const addLabInfo = (labInfo) => {
        labList.innerHTML+= `
        <div>
            <div class="space-between">
                <div class="space-between">
                    <div style="color:#505F74; font-size:19px; font-weight:bold; margin-right:10px;">${labInfo.labName}</div>
                    <div style="color:#6B7684; font-size:15px;">ID ${labInfo.labId}</div>
                </div>
                <div><button class="lab-select-button" data-id="${labInfo.labId}" data-name="${labInfo.labName}"></button></div>
            </div>
            <div style="color:#6B7684;font-size:16px;">${"전북대학교"} | ${labInfo.dept}</div>
        </div>`
    }

    const selectLab=(labId)=>{
        localStorage.setItem("selectedLabID", labId)
        const buttons = labList.querySelectorAll(".lab-select-button")
        for(let btn of buttons){
            if(btn.dataset.id==labId){
                btn.classList.add("lab-select-button-selected")
                handleLabSelected(btn.dataset.id, btn.dataset.name)
            } else {
                btn.classList.remove("lab-select-button-selected")
            }
        }
    }

    REST.getLabsOfUser({}, (status, data)=>{
        for(let lab of data){
            myLabs.push(lab)
            addLabInfo(lab)
        }
        if(localStorage.getItem("selectedLabID"))selectLab(localStorage.getItem("selectedLabID"));
    })

    const openBottomSheet = ()=>{
        overlay.classList.remove("display-none");
        bottomSheet.classList.add("bottom-sheet-up");
    }

    overlay.addEventListener("click",()=>{
        overlay.classList.add("display-none")
        bottomSheet.classList.remove("bottom-sheet-up");
    })

    labSearchInput.addEventListener("keyup",(event)=>{
        if (event.key === 'Enter') {
            const labId = Number(labSearchInput.value);
            REST.getLabInfo({labId}, (status, data)=>{

                if(myLabs.findIndex(e=>e.labId == labId)<0 && localStorage.getItem("role")=="STUDENT"){
                    showModal(`<h1>${data.labName}</h1><p>${"전북대학교"} ${data.dept}</p>`,
                    ["확인", "신청"],
                    [()=>{closeModal()},()=>{
                        closeModal()
                        REST.requestJoinLab({labId}
                            ,()=>{showModal(`<p>연구실 가입 신청이<br> 완료되었습니다.</p>`,["확인"],[()=>{closeModal()}])}
                            ,()=>{showModal(`<p>연구실 가입 신청을<br> 실패했습니다.</p>`,["확인"],[()=>{closeModal()}])})
                    }])
                }else if(localStorage.getItem("role")!="STUDENT"){
                    showModal(`<h1>${data.labName}</h1><p>${"전북대학교"} ${data.dept}</p><p>(소속된 연구실입니다)</p>`,
                    ["확인"],
                    [()=>{closeModal()}])
                }else{
                    showModal(`<h1>${data.labName}</h1><p>${"전북대학교"} ${data.dept}</p><p>(소속된 연구실입니다)</p>`,
                    ["확인"],
                    [()=>{closeModal()}])
                }
                
            },(status, data)=>{
                showModal(`<h1>연구실 검색</h1><p>연구실이 존재하지 않습니다.</p>`,["확인"],[()=>{closeModal()}])
            })
        }
    })

    labList.addEventListener("click",(e)=>{ 
        if(e.target.classList.contains("lab-select-button"))
            selectLab(e.target.dataset.id);
    })

    return [div, selectLab, openBottomSheet]
}