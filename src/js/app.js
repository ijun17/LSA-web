const root = document.getElementById("root")
const webPageManager = new WebPageManager(root)


webPageManager.addPage("main", new MainPage())
webPageManager.addPage("login", new LoginPage())
webPageManager.addPage("join", new JoinPage())

webPageManager.addPage("mobile-login",new MobileLoginPage())
webPageManager.addPage("mobile-join",new MobileJoinPage())
webPageManager.addPage("mobile-info",new MobileInfoPage())
webPageManager.addPage("mobile-join-complete",new MobileJoinCompletePage())
webPageManager.addPage("mobile-info-complete",new MobileInfoCompletePage())
webPageManager.addPage("mobile-main",new MobileMainPage())

function isLogin(){return false;}
function isMobile(){return true;}
function init(){
    webPageManager.setPage("mobile-main")
}

init();