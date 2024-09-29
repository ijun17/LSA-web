function dropdownResearchComponent(labId, canEdit, labSelectHandler){
    const [div, addOption] = dropdownComponent(
        "연구 선택",
        `실습할 <span class="main-color">연구</span>를 선택하세요`,
        `선택한 <span class="main-color">연구</span>`,
        true,true,canEdit)
    
    const [modal, showModal,closeModal] = modalComponent()
    div.appendChild(modal);


    const addResearchOption = (data)=>{
        const onclickedit = ({id,name}, handler, errorHandler)=>{
            const researchId = id, researchName = name;
            REST.editResearch({labId,researchId, researchName},(status, data)=>{
                handler()
            },(status, data)=>{
                showModal(`<h1>오류</h1><p>연구 수정을 실패했습니다.</p><p>${data}</p>`,["확인"],[closeModal])
                errorHandler()
            })
        }

        const onclickdelete = ({id}, handler, errorHandler)=>{
            showModal(`<p>이 연구를 삭제하겠습니까?</p>`,["삭제","취소"],[()=>{
                closeModal();
                REST.removeResearch({labId, researchId:id},(status,data)=>{
                    handler()//연구 삭제 성공
                },(status,data)=>{
                    showModal(`<h1>오류</h1><p>연구 삭제를 실패했습니다.</p><p>${data}</p>`,["확인"],[closeModal])
                    errorHandler()
                })
            },closeModal])
        }

        let handlerOption = {};

        if(data.researchId && canEdit){
            handlerOption = {onclickedit, onclickdelete}
        }

        return addOption(data.researchId, data.researchName, "", (data)=>labSelectHandler(data), handlerOption)
    }

    div.querySelector(".add-button").addEventListener("click",()=>{
        showModal(`<h1>연구 생성</h1><input class="research-name-input" type="text" placeholder="연구 이름">`,["생성","취소"],[()=>{
            const researchName = modal.querySelector(".research-name-input").value;
            closeModal();
            REST.createResearch({labId, researchName},(status,data)=>{
                data.researchName = researchName
                addResearchOption(data);
            },(status,data)=>{
                showModal(`<h1>오류</h1><p>연구 생성을 실패했습니다.</p><p>${data}</p>`,["확인"],[closeModal])
            })
        },closeModal])
    })
    
    REST.getResearch({labId}, (status, data)=>{
        addResearchOption({researchId:null, researchName:"공유받은 매뉴얼"});
        for(let research of data){
            addResearchOption(research);
        }
    },(status, data)=>{
        
    })


    return [div]
}