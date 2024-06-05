const root = document.getElementById("root")
const webPageManager = new WebPageManager(root)
const REST = new RestApi();

let isMobileFlagToFetchUniwebview=false;

function isApp(){
    return true;
}

webPageManager.addPage("login-page",new LoginPage())
webPageManager.addPage("join-page",new JoinPage())
webPageManager.addPage("info-page",new InfoPage())
webPageManager.addPage("join-complete-page",new JoinCompletePage())
webPageManager.addPage("info-complete-page",new InfoCompletePage())
webPageManager.addPage("main-page",new MainPage())
webPageManager.addPage("manage-lab-page",new ManageLabPage())
webPageManager.addPage("experiment-page",new ExperimentPage())
webPageManager.addPage("manage-manual-page",new ManageManualPage())

function isLogin(){return false;}
function isMobile(){return true;}
function init(){
    fetch("uniwebview://isMobile")
    .then(()=>{
        isMobileFlagToFetchUniwebview=true;
        console.log("[ENVIRONMENT] Mobile App")
    })
    .catch((e)=>{
        isMobileFlagToFetchUniwebview=false;
        console.log("[ENVIRONMENT] Web Browser")
    })
    

    if(REST.getAuthToken()){
        webPageManager.setPage("main-page")
    }else{
        webPageManager.setPage("main-page")
    }
}

init();