const manualSearchComponent = ()=>{
    const div = document.createElement('div');
    div.className = 'manual-search-component';
    div.innerHTML = /*html*/`
        <p>다른 연구실의 매뉴얼을 검색해보세요</p>
        <div class='input-form'>
            <input type="text" placeholder="매뉴얼 이름" class='main-input'>
            <button>검색</button>
        </div>
        <div class="result-wrapper"></div>
    `

    const htmlInput = div.querySelector('input');
    const htmlButton = div.querySelector('button');
    const htmlResultWrapper = div.querySelector('.result-wrapper');
    
    const [htmlSearchResert, showResult] = manualSearchResultComponent();
    htmlResultWrapper.append(htmlSearchResert);

    htmlButton.addEventListener('click', searchManual);
    htmlInput.addEventListener('input', ()=>{
        htmlInput.value = htmlInput.value.replaceAll('\n', ' ');
    })
    htmlInput.addEventListener('keyup',(e)=>{
        if(e.key === 'Enter'){
            searchManual();
        }
    })

    function searchManual(){
        const value = htmlInput.value.trim();
        showResult(value);
    }

    return div
}