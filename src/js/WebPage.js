class WebPage{
    container;
    constructor(){
        this.container = document.createElement("div");
    }
    init(){

    }
    setInnerHTML(innerHTML){
        this.container.innerHTML=innerHTML;
    }
    addEvent(query,event,handler){
        this.get(query).addEventListener(event,handler);
    }
    get(query){
        return this.container.querySelector(query)
    }
}