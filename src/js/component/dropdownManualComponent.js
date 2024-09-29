function dropdownManualComponent(labId, researchId, canEdit, manualSelectHandler){
    const [div, addOption] = dropdownComponent(
        "매뉴얼 선택",
        `실습할 <span class="main-color">매뉴얼</span>를 선택하세요`,
        `선택한 <span class="main-color">매뉴얼</span>`,
        true,true,canEdit)
    
    const [modal, showModal,closeModal] = modalComponent()
    div.appendChild(modal);


    const addManualOption = (data)=>{
        const onclickedit = ({id,name}, handler, errorHandler)=>{
            const manualId = id, manualName = name;
            REST.editManual({manualId, manualName},(status, data)=>{
                handler()
            },(status, data)=>{
                showModal(`<h1>오류</h1><p>매뉴얼 수정을 실패했습니다.</p><p>${data}</p>`,["확인"],[closeModal])
                errorHandler()
            })
        }

        const onclickdelete = ({id}, handler, errorHandler)=>{
            showModal(`<p>이 매뉴얼을 삭제하겠습니까?</p>`,["삭제","취소"],[()=>{
                closeModal();
                REST.removeManual({manualId:id},(status,data)=>{
                    handler()//매뉴얼 삭제 성공
                },(status,data)=>{
                    showModal(`<h1>오류</h1><p>매뉴얼 삭제를 실패했습니다.</p><p>${data}</p>`,["확인"],[closeModal])
                    errorHandler()
                })
            },closeModal])
        }

        const onclickshare = ({id}, handler, errorHandler)=>{
            showModal(`<p>이 매뉴얼을 공유하겠습니까?</p>`,["공유","취소"],[()=>{
                closeModal();
                REST.shareManaul({manualId:id},(status,data)=>{
                    handler()//매뉴얼 공유 성공
                },(status,data)=>{
                    showModal(`<h1>오류</h1><p>매뉴얼 공유를 실패했습니다.</p><p>${data}</p>`,["확인"],[closeModal])
                    errorHandler()
                })
            },closeModal])
        }

        let handlerOption = {};

        if(canEdit){
            handlerOption = {onclickedit, onclickdelete, onclickshare};
        }

        addOption(data.manualId, data.manualName, "", (data)=>manualSelectHandler(data), handlerOption)
    }

    div.querySelector(".add-button").addEventListener("click",()=>{
        showModal(`<h1>매뉴얼 생성</h1><input class="manual-name-input" type="text" placeholder="매뉴얼 이름">`,["생성","취소"],[()=>{
            const manualName = modal.querySelector(".manual-name-input").value;
            closeModal();
            REST.createManual({labId,researchId,manualName},(status,data)=>{
                data.manualName = manualName
                addManualOption(data);
            },(status,data)=>{
                showModal(`<h1>오류</h1><p>매뉴얼 생성을 실패했습니다.</p><p>${data}</p>`,["확인"],[closeModal])
            })
        },closeModal])
    })

    if(researchId){
        REST.getManual({researchId}, (status, data)=>{
            for(let manual of data){
                addManualOption(manual);
            }
        },(status, data)=>{
            
        })
    }else{
        REST.getBringedSharedManual({}, (status, data)=>{
            for(let manual of data){
                addManualOption(manual);
            }
        },(status, data)=>{
            
        })
    }
    
    


    return [div]
}