class InfoPage extends WebPage{
    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="flex-center">
            <div class="wrapper">
                <p class="main-text1" style="margin-top:100px;margin-bottom:17px;">축하합니다! 🎉</p>
                <p class="main-text2" style="margin-bottom:50px;">
                안전한 연구를 위해 필요한<br>이제 <span style="color:var(--main-color);">인적사항</span>을 입력해볼까요?
                </p>
                ${
                    this.infoInputComponent(1,"이름","은","을")+
                    this.infoInputComponent(2,"소속 학교","는","를")+
                    this.infoInputComponent(3,"소속 전공","은","을")+
                    this.infoInputComponent(4,"학번","은","을")
                }
                <div class="main-text2">5. 당신의 <span style="color:var(--main-color);">직책</span>은 무엇인가요?</div>
                <div class="select-duty-wrapper">
                    <div class="select-duty" id="info51">
                        <img src="src/assets/images/researcher.png" width=104px/><br>
                        전문 연구자<br>
                        (교수님)
                    </div>
                    <div class="select-duty" id="info52" style="background-color:#F0F0F0;">
                        <img src="src/assets/images/student.png" width=140px/><br>
                        실습자<br>
                        (학생)
                    </div>
                </div>
                <p class="info-warning-text" id="warn">⚠️  등록되지 않은 사용자입니다.<br>정보를 다시 입력해주세요.</p>
                <div class="text-center">
                    <button class="main-button display-none" id="true-button">다음</button>
                    <button class="main-button" id="false-button" style="background-color:#F3F4F8;color:#C1C3C9;">모든 내용을 입력해주세요</button>
                </div>
            </div>
        </div>
        `);

        const trueButton = this.get("#true-button")
        const falseButton = this.get("#false-button")
        const nameInput = this.get("#info1")
        const info51 = this.get("#info51")
        const info52 = this.get("#info52")

        const infoID=["#info1","#info2","#info3","#info4"]
        let data=["","","","",""]
        let empty=true;
        let checkEmpty=()=>{
            let flag=false;
            for(let d of data)if(d=="")flag=true;
            if(empty!=flag){
                this.get("#true-button").classList.toggle("display-none")
                this.get("#false-button").classList.toggle("display-none")
                empty=flag;
            }
        }

        this.addEvent("#info51","click",()=>{data[4]="1";info52.classList.remove("border");info51.classList.add("border");})
        this.addEvent("#info52","click",()=>{data[4]="2";info51.classList.remove("border");info52.classList.add("border");})
        this.addEvent("#info51","click",checkEmpty)
        this.addEvent("#info52","click",checkEmpty)

        for(let i=0; i<4; i++){
            this.addEvent("#info"+(i+1),"input",()=>{
                data[i]=this.get("#info"+(i+1)).value;
                checkEmpty()
            })
        }

        this.addEvent("#true-button", "click", ()=>{
            manager.setPage("info-complete-page", {name:this.get("#info1").value})
        })

        return this.container;
    }

    infoInputComponent(num,text1,text2,text3){
        return `<p class="main-text2">${num}. 당신의 <span style="color:var(--main-color);">${text1}</span>${text2} 어떻게 되나요?</p>
        <div class="text-center">
        <input type="email" class="main-input" id="info${num}" placeholder="${text1+text3} 입력해주세요." style="margin-top:0;margin-bottom:22px;" required><br>
        </div>`
    }
}