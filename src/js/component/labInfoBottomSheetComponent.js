function createLabInfoBottomSheetComponent(){
    const div = document.createElement("div");
    div.className="lab-info-bottom-sheet-component";
    div.innerHTML=`
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
                    <input placeholder="연구실 검색" id="lab-search">
                </div>
            </div>
            <div class="lab-list">
            </div>
        </div>`

    const overlay = div.querySelector(".overlay")
    const bottomSheet = div.querySelector(".bottom-sheet")

    const addLabInfo = (labInfo) => {
        return `
        <div>
            <div class="space-between">
                <div class="space-between">
                    <div style="color:#505F74; font-size:19px; font-weight:bold; margin-right:10px;">${labInfo.name}</div>
                    <div style="color:#6B7684; font-size:15px;">${labInfo.id}</div>
                </div>
                <div><button class="lab-select-button" data-id="${labInfo.id}" data-name="${labInfo.name}"></button></div>
            </div>
            <div style="color:#6B7684;font-size:16px;">${labInfo.univ} | ${labInfo.dept}</div>
        </div>`
    }

    const openBottomSheet = ()=>{
        overlay.classList.remove("display-none");
        bottomSheet.classList.add("bottom-sheet-up");
    }

    overlay.addEventListener("click",()=>{
        overlay.classList.add("display-none")
        bottomSheet.classList.remove("bottom-sheet-up");
    })

    return [div, addLabInfo, openBottomSheet]
}