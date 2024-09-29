function dropdownComponent(title, description, selectDescription, canFold=true, canSelect=true, canEdit=true){

    const optionClassName = "option"
    const selectedOptionClassName = "selected-option"

    const div = document.createElement("div")
    div.className="lsa-dropdown"
    div.innerHTML=`
    <div class="modal-wrapper"></div>
    <div class="flex-center">
        <p class="dropdown-title main-text2">${title}</p>
        <div class="dropdown-body">
            <div class="dropdown-top">
                <div class="dropdown-description">${description}</div>
                <div ${canFold?"":`class="display-none"`}>
                    <button class="add-button ${canEdit?"":`display-none`}">+</button>
                    <button class="accordion-button"><image src="src/assets/images/arrow.png" width="15px"/></button>
                </div>
            </div>
            <div class="option-list"></div>
            <div class="selected-option-preview display-none">
                <div class="${optionClassName} ${selectedOptionClassName}"></div>
            </div>
        </div>
    </div>
    `
    const accordionButton = div.querySelector(".accordion-button");
    const buttonList = div.querySelector(`.option-list`);
    const selectedPreview = div.querySelector(".selected-option-preview")
    const selectedButton = div.querySelector('.selected-option-preview>div');
    const dropdownDescription = div.querySelector(`.dropdown-description`);
    
    let selectedOptionId = null;

    const [modal, showModal, cloasModal] = modalComponent();
    div.appendChild(modal);

    const clickAccordionButton = ()=>{
        if(selectedOptionId===null)return
        buttonList.classList.toggle("option-list-fold");
        selectedPreview.classList.toggle("display-none");
        accordionButton.classList.toggle("accordion-button-open");
    }

    accordionButton.addEventListener("click",clickAccordionButton)

    //옵션을 추가한다.
    const addOption = (id, name, description="", onclick=()=>{}, {onclickedit, onclickdelete, onclickshare})=>{
        const button = document.createElement("div");
        button.innerHTML = `
        <div class="button-name">${name}</div>
        <input type="text" class="display-none">
        <div ${!canEdit ? `class="display-none"` : ""}>
            <button class="edit-comp-button display-none">완료</button>
            <button class="edit-button ${!onclickedit ? "display-none" : ""}">수정</button>
            <button class="delete-button ${!onclickdelete ? "display-none" : ""}">삭제</button>
            <button class="share-button ${!onclickshare ? "display-none" : ""}">공유</button>
        <div>`
        button.className = optionClassName;

        const buttonText = button.querySelector(".button-name");
        const buttonInput = button.querySelector("input");
        const editButton = button.querySelector(".edit-button")
        const editCompButton = button.querySelector(".edit-comp-button")
        const deleteButton = button.querySelector(".delete-button")
        button.addEventListener("click",(e)=>{ //버튼을 선택
            if(!(e.target == button || e.target == buttonText))return;
            selectedOptionId = id;
            selectedButton.innerText = name;
            dropdownDescription.innerHTML = selectDescription;
            clickAccordionButton()
            const buttons = buttonList.querySelectorAll("."+optionClassName);
            for(let b of buttons)b.classList.remove(selectedOptionClassName);
            button.classList.add(selectedOptionClassName)
            onclick({id,name,description});
        })
        editButton.addEventListener("click",()=>{ //버튼 수정 버튼
            buttonText.classList.add("display-none");
            buttonInput.classList.remove("display-none")
            buttonInput.value = buttonText.innerText;
            buttonInput.focus();
            editButton.classList.add("display-none");
            editCompButton.classList.remove("display-none");
        })
        editCompButton.addEventListener("mousedown",()=>{
            if(buttonInput.value == buttonText.innerText)return;
            onclickedit({id:id, name:buttonInput.value},()=>{
                buttonText.innerText = buttonInput.value;
            },()=>{

            })
        })
        deleteButton.addEventListener("click",()=>{
            onclickdelete({id:id, name:buttonInput.value}, ()=>{
                button.remove()
            },()=>{

            })
        })

        buttonInput.addEventListener("focusout", (e)=>{
            buttonText.classList.remove("display-none");
            buttonInput.classList.add("display-none");
            editButton.classList.remove("display-none");
            editCompButton.classList.add("display-none");

        })

        buttonList.appendChild(button);

        return button;
    }



    return [div, addOption]
}