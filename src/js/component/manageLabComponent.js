function manageLabComponent(labName,labId,univ,department,location){

    const div = document.createElement("div")
    div.className="manage-lab-component"
    div.innerHTML=`
    <div class="flex-center">
        <div class="body">
            <div class="top">
                <div>
                    <div><span>${labName}</span><span>${labId}</span></div>
                    <div>
                        <span class="new-badge"></span>
                        <button class="accordion-button"><image src="src/assets/images/_화살표 아이콘.png" width="15px"/></button>
                    </div>
                </div>
                <div>${univ+" | "+department+" | "+location}</div>
            </div>
            <div class="folder">
                <div>소속 실습자<span class="new-badge"></span></div>
                <div class="member-list"></div>
                <div>소속 신청 리스트<span class="new-badge"></span></div>
                <div class="wait-list"></div>
            </div>
        </div>
    </div>
    `
    const accordionButton = div.querySelector(".accordion-button");
    const folder = div.querySelector(`.folder`);
    const memberList = div.querySelector(".member-list");
    const waitList = div.querySelector(".wait-list");

    const clickAccordionButton = ()=>{
        folder.classList.toggle("folder-open");
    }

    accordionButton.addEventListener("click",clickAccordionButton)

    const getListInfo=(type, univ, department, name, id)=>{
        return `<div class="list-body">
            <div class="list-profile-image"></div>
            <div class="list-info">
                <div>${type+" | "+univ+" | "+department}</div>
                <div><span>${name}</span><span>${id}</span></div>
            </div>
        </div>`
    }

    const addMemberList = (type, univ, department, name, id, onclickdeletebutton=()=>{})=>{
        const list = document.createElement("div");
        list.innerHTML=`
        ${getListInfo(type, univ, department, name, id)}
        <div class="button-part>
            <button class="delete-button">삭제</button>
        </div>
        `
        const deleteButton = list.querySelector(".delete-button");
        deleteButton.addEventListener("click",onclickdeletebutton(type, univ, department, name, id));
        memberList.appendChild(list);
    }

    const addWaitList = (type, univ, department, name, id, onclickacceptbutton=()=>{}, onclickdenybutton=()=>{})=>{
        const list = document.createElement("div");
        list.innerHTML=`
        ${getListInfo(type, univ, department, name, id)}
        <div class="button-part>
            <button class="accept-button">수락</button>
            <button class="deny-button">거절</button>
        </div>
        `
        const acceptButton = list.querySelector(".accept-button");
        const denyButton = list.querySelector(".deny-button");
        acceptButton.addEventListener("click",()=>{
            onclickacceptbutton(type, univ, department, name, id)
        });
        denyButton.addEventListener("click",()=>{
            onclickdenytbutton(type, univ, department, name, id)
        })


    }
    return [div, addMemberList, addWaitList]
}