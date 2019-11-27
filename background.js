function listener() {

    function isSupportedProtocol(urlString) {
        var supportedProtocols = ["https:", "http:", "ftp:", "file:"];
        var url = document.createElement('a');
        url.href = urlString;
        return supportedProtocols.indexOf(url.protocol) != -1;
    }
    
    function updateTab(tabs) {
        if (tabs[0]) {
            currentTab = tabs[0];
            if (isSupportedProtocol(currentTab.url)) {
                browser.tabs.update(
                    currentTab.id, 
                    {url: generateUrl(currentTab.url)}
                );
            } else {
                console.log(`The UWO EzProxy extension does not support the '${currentTab.url}' URL.`);
            }
        }
    }

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then(updateTab);
}

function generateUrl(urlin) {
    var ezproxy = "https://www.lib.uwo.ca/cgi-bin/ezpauthn.cgi?url=";
    return ezproxy + urlin;
}

browser.browserAction.onClicked.addListener(listener);
console.log('EZPROXY!!!');