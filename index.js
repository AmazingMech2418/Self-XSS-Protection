window.addEventListener("load", () => {
    Object.freeze(Array.prototype);
    Object.freeze(Object.prototype);
    Object.freeze(String.prototype);
    Object.freeze(Function.prototype);
    
    const confirm = window.confirm;
    
    const universalPaths = [
        /**
         * Add here any universally allowed paths you need for your website.
         * Paths should be objects with a domain and path
         */
    ];
    
    Object.freeze(universalPaths);
    
    const previouslyAllowed = []; // Starts as empty since nothing has been allowed

    function comparePaths(_a, _b) {
        let a = _a.split("#")[0].split("?")[0];
        let b = _b.split("#")[0].split("?")[0];
        if (a[a.length - 1] != "/") a += "/";
        if (b[b.length - 1] != "/") b += "/";

        let listA = a.split('/').filter(n => n.length > 0);
        let listB = b.split('/').filter(n => n.length > 0);

        if (listA.length != listB.length) return false;

        for (let i = 0; i < listA.length; i++) {
            if (listA[i] == "*" || listB[i] == "*") continue;
            if (listA[i] != listB[i]) return false;
        }
        return true;
        return a == b;
    }


    function parseURL() {
        let list = [];
        list = list.concat(universalPaths);

        /**
         * Here, parse the URL and use list.concat() to add any other paths to allow depending on the URL.
         */


        return list;
    }

    const knownDomains = {
        /**
         * Here, add the domains you are using. 
         * The key for each item should be the domain name and it should represent an object with a name property that is set to a string representing what that domain is for.
         * This is not currently used, but will be used in future updates.
         */
    };

    function overrideRequests(callback) {
        let xmlHttpRequestListener = new Object();
        xmlHttpRequestListener.tempOpen = XMLHttpRequest.prototype.open;
        xmlHttpRequestListener.tempSend = XMLHttpRequest.prototype.send;
        xmlHttpRequestListener.callback = function (a, b, c) {
            return callback(a, b, c, this);
        };

        XMLHttpRequest.prototype.open = function (_a, _b) {
            let a = _a || '';
            let b = _b || '';
            xmlHttpRequestListener.tempOpen.apply(this, arguments);
            xmlHttpRequestListener.method = a;
            xmlHttpRequestListener.url = b;
            if (a.toLowerCase() == 'get') {
                xmlHttpRequestListener.data = b.split('?');
                xmlHttpRequestListener.data = xmlHttpRequestListener.data[1];
            }
        }

        XMLHttpRequest.prototype.send = function (_a, _b) {
            let a = _a || '';
            let b = _b || '';
            let result = xmlHttpRequestListener.callback(a, b, false);
            if (result == "DROP_REQUEST") return;
            
            xmlHttpRequestListener.tempSend.apply(this, arguments);
            if (xmlHttpRequestListener.method.toLowerCase() == 'post') xmlHttpRequestListener.data = a;
        }
        
        Object.freeze(XMLHttpRequest.prototype);
        Object.freeze(xmlHttpRequestListener);

        let oldFetch = fetch;
        fetch = async (url, options) => {
            let result = callback(url, options);
            if (result == "DROP_REQUEST") return;
            return oldFetch(url, options);
        }
    }

    function confirmPath(a, b, isFetch = true, requestObj = {}) {


        let requestURL;
        let method;

        if ("url" in requestObj) {
            requestURL = requestObj.url;
            method = requestObj && "method" in requestObj ? requestObj.method : "GET";
            //return confirm(`Request to ${requestObj.url}`)?"":"DROP_REQUEST";
        } else if (isFetch && typeof (a) == "string") {
            requestURL = a;
            method = b && "method" in b ? b.method : "GET";
            //return confirm(`Request to ${a}`)?"":"DROP_REQUEST";
        } else if (typeof (a) == "object" && "url" in a) {
            requestURL = a.url;
            method = a && "method" in a ? a.method : "GET";
            //return confirm(`Request to ${a.url}`)?"":"DROP_REQUEST";
        } else {
            return confirm(`Unable to verify request. It is not recommended to continue.`) ? "" : "DROP_REQUEST";
        }


        let urlReader = document.createElement('a');
        urlReader.href = requestURL;

        const domain = urlReader.hostname;
        const path = urlReader.pathname;

        let allowed = parseURL().concat(previouslyAllowed);
        for (let i of allowed) {
            if (i.domain == domain && comparePaths(i.path, path)) {
                if (!("method" in i) || i.method == method)
                    return "";
            }
        }

        
        const confirmed = confirm(`Request to ${requestURL} of method ${method}`);
        
        if(confirmed) previouslyAllowed.push({domain, path, method});

        return confirmed ? "" : "DROP_REQUEST";
    }

    overrideRequests(confirmPath);
});
