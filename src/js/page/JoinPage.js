class JoinPage extends WebPage{

    state=0; //

    constructor(){
        super()
    }
    init(manager){
        this.setInnerHTML(`
        <div class="modal-wrapper"></div>
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

                <div class="text-center display-none" style="position:relative;" id="auth-input">
                    <input type="number" class="main-input" placeholder="인증번호" id="cert-send-input" required>
                    <button class="email-auth-button" id="cert-send-button">인증</button>
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
        const info51 = this.get("#info51")
        const info52 = this.get("#info52")

        const [modal, openModal, closeModal] = modalComponent();
        this.get(".modal-wrapper").appendChild(modal)

        // const infoID=["#info1","#info2","#info3","#info4"]
        let data=["","","","","","",""]
        let empty=true;
        let samePW=true; // 비밀번호와 비밀번호 확인 똑같은지
        let auth=false;

        let checkEmpty=()=>{
            empty=false;
            for(let d of data)if(d=="")empty=true;
            if(!samePW)empty=true;
            if(empty){
                this.get("#true-button").classList.add("display-none")
                this.get("#false-button").classList.remove("display-none")
            }else{
                this.get("#true-button").classList.remove("display-none")
                this.get("#false-button").classList.add("display-none")
            }
        }

        this.addEvent("#info51","click",()=>{
            if(auth)return
            data[4]="RESEARCHER";
            info52.classList.remove("border");
            info51.classList.add("border");
            checkEmpty();
        })
        this.addEvent("#info52","click",()=>{
            if(auth)return
            data[4]="STUDENT";
            info51.classList.remove("border");
            info52.classList.add("border");
            checkEmpty();
        })

        for(let i=0; i<4; i++){
            this.addEvent("#info"+(i+1),"input",()=>{
                data[i]=this.get("#info"+(i+1)).value;
                checkEmpty()
            })
        }

        this.addEvent("#email", "input", ()=>{
            data[5] = this.get("#email").value;
        })

        // 비밀번호 비교
        let ckeckPasswordSame=()=>{
            const pw1 = this.get("#pw1").value;
            const pw2 = this.get("#pw2").value;
            data[6]=pw1
            if(samePW!=(pw1==pw2))this.get("#warnPw").classList.toggle("hidden")
            samePW=(pw1==pw2)
        }

        this.addEvent("#pw1","input",()=>{ckeckPasswordSame(); checkEmpty()})
        this.addEvent("#pw2","input",()=>{ckeckPasswordSame(); checkEmpty()})

        this.addEvent("#true-button", "click", ()=>{
            const username = data[5];
            const password = data[6];
            const name = data[0];
            const dept = data[2];
            const staffId = data[3];
            const role = data[4];
            REST.join({username, password, name, staffId, role, dept},(status,data)=>{
                auth=true;
                for(let i=0; i<4; i++)this.get("#info"+(i+1)).readOnly=true;
                this.get("#email").readOnly = true;
                this.get("#pw1").readOnly = true;
                this.get("#pw2").readOnly = true;
                trueButton.classList.add("display-none")
                this.get("#auth-input").classList.remove("display-none");
                openModal(`<p>이메일로 전송된 인증 번호를 입력해주세요</p>`, ["확인"], [closeModal])
            },(status, data)=>{
                openModal(`<h1>오류</h1><p>입력한 정보를 다시 확인해주세요.</p><p>${data}</p>`, ["확인"], [closeModal])
            })
        })

        this.addEvent("#cert-send-button", "click", ()=>{
            const email = data[5];
            const code = Number(this.get("#cert-send-input").value);
            const username = data[5];
            const password = data[6];
            const name = data[0];
            const dept = data[2];
            const staffId = data[3];
            const role = data[4];
            REST.authEmail({email,code,username,password,name,staffId,role,dept},(status, data)=>{
                manager.setPage("join-complete-page")
            }, (status, data)=>{
                openModal(`<h1>오류</h1><p>인증에 실패했습니다.</p><p>${data}</p>`, ["확인"], [closeModal])
            })
        })

        this.addEvent(".back-button","click",()=>{manager.setPage("login-page")})
        return this.container;
    }

    infoInputComponent(num,text1,text2,text3){
        return `<p class="main-text2">${num}. 당신의 <span style="color:var(--main-color);">${text1}</span>${text2} 어떻게 되나요?</p>
        <div class="text-center">
        <input type="email" class="main-input" id="info${num}" placeholder="${text1+text3} 입력해주세요." style="margin-top:0;margin-bottom:22px;" required><br>
        </div>`
    }
}