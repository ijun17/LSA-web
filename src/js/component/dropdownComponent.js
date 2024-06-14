function dropdownComponent(title, description, selectDescription, canFold=true, canSelect=true, canEdit=true){

    const optionClassName = "option"
    const selectedOptionClassName = "selected-option"

    const div = document.createElement("div")
    div.className="lsa-dropdown"
    div.innerHTML=`
    <div class="flex-center">
        <p class="dropdown-title main-text2">${title}</p>
        <div class="dropdown-body">
            <div class="dropdown-top">
                <div class="dropdown-description">${description}</div>
                <div ${canFold?"":`class="display-none"`}>
                    <button class="accordion-button"><image src="src/assets/images/arrow.png" width="15px"/></button>
                </div>
            </div>
            <div class="option-list"></div>
            <div class="selected-option-preview display-none"></div>
        </div>
    </div>
    `
    const accordionButton = div.querySelector(".accordion-button");
    const buttonList = div.querySelector(`.option-list`);
    const selectedButton = div.querySelector('.selected-option-preview');
    const dropdownDescription = div.querySelector(`.dropdown-description`);
    
    let selectedOptionId = null;

    const clickAccordionButton = ()=>{
        if(selectedOptionId===null)return
        buttonList.classList.toggle("option-list-fold");
        selectedButton.classList.toggle("display-none");
        accordionButton.classList.toggle("accordion-button-open");
    }

    accordionButton.addEventListener("click",clickAccordionButton)

    // 프리뷰 눌렀을때 선택해제 되는것
    // selectedButton.addEventListener("click",(e)=>{
    //     if(e.target.classList.contains(optionClassName)){
    //         clickAccordionButton()
    //         selectedOptionId = null;
    //         const buttons = buttonList.querySelectorAll("."+optionClassName);
    //         for(let b of buttons)b.classList.remove(selectedOptionClassName);
    //     }
    // })

    const addOption = (id, name, description="", onclick=()=>{})=>{
        const button = document.createElement("div");
        button.dataset.id=id;
        button.innerText = name;
        button.className = optionClassName;
        button.addEventListener("click",()=>{
            if(canSelect){
                selectedOptionId = id;
                selectedButton.innerHTML = `
                    <div class="${optionClassName} ${selectedOptionClassName}">${name}</div>
                    <div class="selected-option-description">${description}</div>
                `
                dropdownDescription.innerHTML = selectDescription;
                clickAccordionButton()

                const buttons = buttonList.querySelectorAll("."+optionClassName);
                for(let b of buttons)b.classList.remove(selectedOptionClassName);
                button.classList.add(selectedOptionClassName)
            }
            onclick(id,name,description);
        })
        buttonList.appendChild(button);
    }
    return [div, addOption]
}