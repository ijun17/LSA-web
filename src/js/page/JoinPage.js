class JoinPage extends WebPage{

    state=0; //

    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="flex-center">
            <div class="wrapper">
                <button class="back-button"><image src="src/assets/images/back.png" width=25px></button>
                <p class="main-text1" style="margin-top:60px;margin-bottom:50px;">회원가입</p>
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

                <p class="main-text2">6. <span style="color:var(--main-color);">이메일</span>과 <span style="color:var(--main-color);">비밀번호</span>를 입력해주세요.</p>
                <div class="text-center">
                    <input type="email" class="main-input" id="email" name="email" placeholder="이메일" required><br>
                </div>
                <p class="warning-text hidden" id="email-warning-text">⚠️  중복 이메일입니다. 다시 입력해주세요.</p>
                <div class="text-center">
                    <input type="password" class="main-input" id="pw1" name="password" placeholder="비밀번호" required><br>
                    <input type="password" class="main-input" id="pw2" name="password" placeholder="비밀번호 확인" required><br>
                </div>
                <p class="warning-text hidden" id="warnPw">⚠️  비밀번호가 일치하지 않습니다.</p>

                <div class="text-center" style="position:relative;">
                    <input type="email" class="main-input" placeholder="인증번호" required>
                    <button class="email-auth-button" id="cert-send-button">재전송</button>
                </div>
                <p class="warning-text hidden" id="cert-warning-text">⚠️  인증번호가 틀렸습니다. 다시 시도해주세요.</p>

                <div class="text-center" style="margin-bottom:40px;">
                    <button class="main-button display-none" id="true-button">회원가입</button>
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

        // const infoID=["#info1","#info2","#info3","#info4"]
        let data=["","","","","","",""]
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

        let enableEmail=false; //이메일 인증 되었는지
        let samePW=true; // 비밀번호와 비밀번호 확인 똑같은지

        // 비밀번호 비교
        let ckeckPasswordSame=()=>{
            const pw1 = this.get("#pw1").value;
            const pw2 = this.get("#pw2").value;
            if(samePW!=(pw1==pw2))this.get("#warnPw").classList.toggle("hidden")
            samePW=(pw1==pw2)
        }
        let checkEmail

        this.addEvent("#pw1","input",ckeckPasswordSame)
        this.addEvent("#pw2","input",ckeckPasswordSame)

        this.addEvent(".back-button","click",()=>{
            manager.setPage("login-page")
        })

        this.addEvent(".main-button","click",()=>{
            manager.setPage("join-complete-page")
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