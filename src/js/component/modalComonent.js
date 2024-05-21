const modalComponent=()=>{
    const div = document.createElement("div");
    div.className="modal-component display-none";
    div.innerHTML=`
        <div class="overlay"></div>
        <div class="modal-body">
            <div class="modal-content"></div>
            <div class="button-list"></div>
        </div>    
        `
    const modalContent = div.querySelector(".modal-content");
    const buttonList = div.querySelector(".button-list");
    

    const closeModal = ()=>{
        div.classList.add("display-none");
    }   

    const openModal = (content, buttonNames=[], handlers=[])=>{
        div.classList.remove("display-none");
        modalContent.innerHTML = content;
        buttonList.innerHTML = "";
        if(buttonNames.length != handlers.length)console.error("modal-component: different length of buttonNames and handlers");
        for(let i=0; i<buttonNames.length; i++){
            const button = document.createElement("button");
            button.innerText = buttonNames[i];
            button.addEventListener("click",handlers[i]);
            buttonList.appendChild(button);
        }
    }

    return [div, openModal, closeModal]
}