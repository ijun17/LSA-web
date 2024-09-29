const manualSearchResultComponent = ()=>{
    const div = document.createElement('div');
    div.className = 'manual-search-result-component display-none';
    div.innerHTML = /*html*/`
        <div class="overlay"></div>
        <div class="result-body">
            <div class="result-header">
                <p>"<span></span>"에 대한 검색 결과</p>
                <button class="close-button">✕</button>
            </div>
            <div class="manual-list"></div>
        </div>
    `;

    const htmlManualList = div.querySelector('.manual-list');
    const htmlSpan = div.querySelector('span');
    const htmlCloseButton = div.querySelector('.close-button');

    htmlCloseButton.addEventListener('click', ()=>div.classList.add('display-none'))

    function addManulaList(manualId, manualName, downloads){   
        htmlManualList.innerHTML += /*html*/`
            <div>
                <div>
                    <div>${manualName}</div>
                    <div>ID ${manualId}</div>
                    <div>downloads ${downloads}</div>
                </div>
                <div>
                    <button class="bring-button">가져오기</button>
                </div>
            </div>
        `
    }

    function showResult(name){
        htmlSpan.innerText = name;
        div.classList.remove('display-none');
        REST.searchManual({name}, (status, res)=>{
            htmlManualList.innerHTML = '';
            res.forEach(e=>{
                addManulaList(e.manualId, e.manualName, e.downloads);
            })
        }, err=>{

        })
    }


    return [div, showResult];
}