function createUserInfoBottomSheetComponent(){
    const div = document.createElement("div");
    div.className="user-info-bottom-sheet-component";
    div.innerHTML=`
        <div class="overlay display-none"></div>
        <div class="bottom-sheet">
            <div>
                <div style="background-color:#e6e6e6;width:15%;height:6.5px;border-radius:3.2px;margin-bottom:30px;"></div>
                <div class="space-between" style="width:100%">
                    <div class="hidden" style="width:70px;"><button style="border:none; background-color:unset;"><img src="src/assets/images/back.png" width=25px/></button></div>
                    <div style="font-size:22px;font-weight:bold; color:#3F4956">사용자 정보 설정</div>
                    <div class="logout" style="width:70px;">로그아웃</div>
                </div>
            </div>
            <div class="user-info">
                <p>이름</p><div class="text-center"><input class="main-input" id="user-info1" readonly></div>
                <p>직책</p><div class="text-center"><input class="main-input" id="user-info2" readonly></div>
                <p>소속 학교</p><div class="text-center"><input class="main-input" id="user-info3" readonly></div>
                <p>소속 전공</p><div class="text-center"><input class="main-input" id="user-info4" readonly></div>
                <p>학번 / 사번</p><div class="text-center"><input class="main-input" id="user-info5" readonly></div>
            </div>
        </div>`

    const overlay = div.querySelector(".overlay")
    const bottomSheet = div.querySelector(".bottom-sheet")
    const logoutButton = div.querySelector(".logout")

    const name=div.querySelector("#user-info1")
    const role=div.querySelector("#user-info2")
    const univ=div.querySelector("#user-info3")
    const dept=div.querySelector("#user-info4")
    const staffId=div.querySelector("#user-info5")
    const setInfo = (data)=>{
        name.value = data.name
        role.value = data.role
        univ.value = "전북대학교"
        dept.value = data.dept
        staffId.value = data.staffId
    }

    const openBottomSheet = ()=>{
        overlay.classList.remove("display-none");
        bottomSheet.classList.add("bottom-sheet-up");
    }

    overlay.addEventListener("click",()=>{
        overlay.classList.add("display-none")
        bottomSheet.classList.remove("bottom-sheet-up");
    })

    logoutButton.addEventListener("click",()=>{
        webPageManager.setPage("login-page")
        REST.logout()
    })


    return [div, setInfo, openBottomSheet]
}