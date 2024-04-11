const root = document.getElementById("root")
const webPageManager = new WebPageManager(root)

webPageManager.addPage("mobile-login",new MobileLoginPage())
webPageManager.addPage("mobile-join",new MobileJoinPage())
webPageManager.addPage("mobile-info",new MobileInfoPage())
webPageManager.addPage("mobile-join-complete",new MobileJoinCompletePage())
webPageManager.addPage("mobile-info-complete",new MobileInfoCompletePage())

function isLogin(){return false;}
function isMobile(){return true;}
function init(){
    webPageManager.setPage("mobile-join-complete")
}

init();