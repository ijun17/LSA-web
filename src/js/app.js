const root = document.getElementById("root")
const webPageManager = new WebPageManager(root)

webPageManager.addPage("mobile-login",new PageLoginMobile())
webPageManager.addPage("mobile-join",new PageJoinMobile())
webPageManager.addPage("mobile-info",new PageInfoMobile())

function isLogin(){return false;}
function isMobile(){return true;}
function init(){
    webPageManager.setPage("mobile-login")
}

init();