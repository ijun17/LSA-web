const root = document.getElementById("root")
const webPageManager = new WebPageManager(root)
const REST = new TestRestApi();

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
    

    if(REST.getAuthToken() && REST.getUserId()){
        webPageManager.setPage("join-page")
    }else{
        webPageManager.setPage("login-page")
    }
}

init();