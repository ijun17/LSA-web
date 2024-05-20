function topbarComponent(name, backPageName="main-page"){
    const div = document.createElement("div")
    div.className="topbar-component"
    div.innerHTML=`
        <div class="top-bar">
            <div>
                <div><button id="back-button" style="border:none; background-color:unset;"><image src="src/assets/images/back.png" width=25px></button></div>
                <div>${name}</div>
                <div style="width:25px;"></div>
            </div>
        </div>
    `
    div.querySelector("#back-button").addEventListener("click", ()=>{webPageManager.setPage(backPageName)})
    return div;
}