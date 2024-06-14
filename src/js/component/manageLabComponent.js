function manageLabComponent(labName,labId,dept){
    const div = document.createElement("div")
    div.className="manage-lab-component"
    div.innerHTML=`
    <div class="modal-component-wrapper"></div>
    <div class="flex-center">
        <div class="body">
            <div class="top">
                <div>
                    <div><span class="text1">${labName}</span><span class="text4">ID ${labId}</span></div>
                    <div>
                        <span class="new-badge"></span>
                        <button class="accordion-button"><image src="src/assets/images/arrow.png" width="15px"/></button>
                    </div>
                </div>
                <div class="text3">${"전북대학교"+" | "+dept}</div>
            </div>
            <div class="folder">
                <h1 class="text1">연구실 멤버<span class="new-badge"></span></h1>
                <div class="member-list"></div>
                <h1 class="text1">가입 요청 리스트<span class="new-badge"></span></h1>
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


    const getUserInfo=(role, dept, name, staffId)=>{
        role = role=="RESEARCHER"?"전문 연구자":"실습자"
        return `<div class="list-body">
            <div class="list-profile-image"><img src="src/assets/images/profile_image.png" width=51px/></div>
            <div class="list-info">
                <div class="text4">${role+" | "+"전북대학교"+" | "+dept}</div>
                <div><span class="text2">${name}</span><span class="text4">${staffId}</span></div>
            </div>
        </div>`
    }

    const deleteMember = (list,userId)=>{
        REST.removeLabMember({userId, labId}, ()=>{
            console.log("멤버가 삭제되었습니다.")
            list.remove()
        })
    }

    const responseWait = (list, req, accept)=>{
        REST.responseJoinLabReqeust({requestId:req.requestId, accept},()=>{
            req.name = req.userName
            if(accept==1){ //수락
                addMemberList(req)
            }
            list.remove()
        })
    }

    const addMemberList = (member)=>{
        const list = document.createElement("div");
        list.innerHTML=`
        ${getUserInfo(member.role, member.dept, member.name, member.staffId)}
        <div class="button-part">
            <button class="delete-button">삭제</button>
        </div>
        `
        const deleteButton = list.querySelector(".delete-button");
        deleteButton.addEventListener("click",()=>{
            openModal(`<p>이 실습자를 삭제하겠습니까</p>`,["취소","삭제"],[
                ()=>{closeModal()},
                ()=>{
                    deleteMember(list,member.userId)
                    closeModal();
                }]
            )
        })
        if(member.userId == REST.getUserId())deleteButton.style.visibility = "hidden";
        memberList.appendChild(list);
    }

    const addWaitList = (req)=>{
        const list = document.createElement("div");
        list.innerHTML=`
        ${getUserInfo(req.role, req.dept, req.userName, req.staffId)}
        <div class="button-part">
            <button class="accept-button">수락</button>
            <button class="deny-button">거절</button>
        </div>
        `
        const acceptButton = list.querySelector(".accept-button");
        const denyButton = list.querySelector(".deny-button");
        acceptButton.addEventListener("click",()=>{responseWait(list, req, 1)});
        denyButton.addEventListener("click",()=>{responseWait(list, req, 0)});

        waitList.appendChild(list);
    }


    REST.getLabMembers({labId},(status, data)=>{
        for(let member of data){
            addMemberList(member)
        }
    })

    REST.getJoinRequestOfLab({labId},(status, data)=>{
        for(let req of data){
            addWaitList(req)
        }
    })
    
    



    accordionButton.addEventListener("click",clickAccordionButton)
    return [div]
}