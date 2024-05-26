function manageLabComponent(labName,labId,univ,department,location){
    const div = document.createElement("div")
    div.className="manage-lab-component"
    div.innerHTML=`
    <div class="modal-component-wrapper"></div>
    <div class="flex-center">
        <div class="body">
            <div class="top">
                <div>
                    <div><span class="text1">${labName}</span><span class="text4">  ${labId}</span></div>
                    <div>
                        <span class="new-badge"></span>
                        <button class="accordion-button"><image src="src/assets/images/_화살표 아이콘.png" width="15px"/></button>
                    </div>
                </div>
                <div class="text3">${univ+" | "+department+" | "+location}</div>
            </div>
            <div class="folder">
                <h1 class="text1">소속 실습자<span class="new-badge"></span></h1>
                <div class="member-list"></div>
                <h1 class="text1">소속 신청 리스트<span class="new-badge"></span></h1>
                <div class="wait-list"></div>
            </div>
        </div>
    </div>
    `
    const modalComponentWrapper = div.querySelector(".modal-component-wrapper");
    const [modal, openModal, closeModal] = modalComponent();
    modalComponentWrapper.appendChild(modal);
    

    const accordionButton = div.querySelector(".accordion-button");
    const folder = div.querySelector(`.folder`);
    const memberList = div.querySelector(".member-list");
    const waitList = div.querySelector(".wait-list");

    const clickAccordionButton = ()=>{
        accordionButton.classList.toggle("accordion-button-open")
        folder.classList.toggle("folder-open");
    }


    const getUserInfo=(type, univ, department, name, id)=>{
        return `<div class="list-body">
            <div class="list-profile-image"><img src="src/assets/images/사람 아이콘.png" width=51px/></div>
            <div class="list-info">
                <div class="text4">${type+" | "+univ+" | "+department}</div>
                <div><span class="text2">${name}</span><span class="text4">${id}</span></div>
            </div>
        </div>`
    }

    const deleteMember = async ()=>{

    }

    const deleteWait = async ()=>{

    }

    const acceptWait = async ()=>{

    }

    const addMemberList = (type, univ, department, name, id)=>{
        const list = document.createElement("div");
        list.innerHTML=`
        ${getUserInfo(type, univ, department, name, id)}
        <div class="button-part">
            <button class="delete-button">삭제</button>
        </div>
        `
        const deleteButton = list.querySelector(".delete-button");
        deleteButton.addEventListener("click",()=>{
            openModal(`<p>이 실습자를 삭제하겠습니까</p>`,["취소","삭제"],[
                ()=>{closeModal()},
                ()=>{
                    list.remove();
                    closeModal();
                    deleteMember();
                }]
            )
        })
        memberList.appendChild(list);
    }

    const addWaitList = (type, univ, department, name, id)=>{
        const list = document.createElement("div");
        list.innerHTML=`
        ${getUserInfo(type, univ, department, name, id)}
        <div class="button-part">
            <button class="accept-button">수락</button>
            <button class="deny-button">거절</button>
        </div>
        `
        const acceptButton = list.querySelector(".accept-button");
        const denyButton = list.querySelector(".deny-button");
        acceptButton.addEventListener("click",()=>{
            acceptWait(type, univ, department, name, id)
        });
        denyButton.addEventListener("click",()=>{
            list.remove();
            deleteWait(type, univ, department, name, id)
        })

        waitList.appendChild(list);
    }



    const testMemberList = [{type:"실습자", univ:"전북대학교", department:"소프트웨어공학과", name:"김준기", id:"201911067"},{type:"실습자", univ:"전북대학교", department:"소프트웨어공학과", name:"김준기", id:"201911067"}]
    const testWaitList = [{type:"실습자", univ:"전북대학교", department:"소프트웨어공학과", name:"김준기", id:"201911067"},{type:"실습자", univ:"전북대학교", department:"소프트웨어공학과", name:"김준기", id:"201911067"}]
    for(let member of testMemberList){
        addMemberList(member.type, member.univ, member.department, member.name, member.id)
    }

    for(let member of testWaitList){
        addWaitList(member.type, member.univ, member.department, member.name, member.id)
    }


    accordionButton.addEventListener("click",clickAccordionButton)
    return [div, addMemberList, addWaitList]
}