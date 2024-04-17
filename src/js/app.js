const root = document.getElementById("root")
const webPageManager = new WebPageManager(root)

// webPageManager.addPage("main-page", new MainPage())
// webPageManager.addPage("login-page", new LoginPage())
// webPageManager.addPage("join-page", new JoinPage())

webPageManager.addPage("login-page",new LoginPage())
webPageManager.addPage("join-page",new JoinPage())
webPageManager.addPage("info-page",new InfoPage())
webPageManager.addPage("join-complete-page",new JoinCompletePage())
webPageManager.addPage("info-complete-page",new InfoCompletePage())
webPageManager.addPage("main-page",new MainPage())
webPageManager.addPage("manage-lab-page",new ManageLabPage())

function isLogin(){return false;}
function isMobile(){return true;}
function init(){
    webPageManager.setPage("login-page")
}

init();