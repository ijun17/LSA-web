/*
페이지를 SPA로 관리하고 라우팅 기능을 함.
*/

class WebPageManager{
    root;
    pages={};
    
    constructor(root){
        this.root = root;
    }

    addPage(pageName,page){
        if(!(page instanceof WebPage)){
            console.error("addPage");
            return;
        }
        this.pages[pageName]=page;
    }

    loadPage(url){
        const pageName = url; //url에서 페이지 이름 추출
        this.setPage(pageName);
    }

    setPage(pageName,param){
        if(!(pageName in this.pages)){
            console.error("setPage")
            return;
        }
        this.root.innerHTML = "";
        this.root.appendChild(this.pages[pageName].init(this,param));
    }

    isMobile(){
        return true;
    }
}