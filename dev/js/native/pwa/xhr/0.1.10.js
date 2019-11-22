/* jshint browser: true */

window.xhrPolyfill = window.xhrPolyfill || {};

window.xhrPolyfill.originalXMLHttpRequest = window.XMLHttpRequest;

window.xhrPolyfill.getOrigin = function (url) {
    var match;
    match = /^(?:\w+\:)?(?:\/\/)([^\/]*)/.exec(url);
    if (!match) throw 'invalid url';
    return match[0];
}; //getOrigin

window.xhrPolyfill.parseHeaders = function (headers) {
    var headerIndex, headerName, parsedHeaders;
    var match;

    if (!headers) return {};

    if (typeof headers === 'string') {
        headers = headers.split(/\r\n/);
    }


    if (Object.prototype.toString.apply(headers) === '[object Array]') {
        parsedHeaders = {};
        for (headerIndex = headers.length - 1; headerIndex >= 0; headerIndex--) {
            match = /^(.+?)\:\s*(.+)$/.exec(headers[headerIndex]);
            match && (parsedHeaders[match[1]] = match[2]);
        }

        headers = parsedHeaders;
        parsedHeaders = null;
    }

    if (typeof headers === 'object') {
        parsedHeaders = {};
        for (headerName in headers) {
            parsedHeaders[headerName.toLowerCase()] = headers[headerName];
        }
        headers = parsedHeaders;
        parsedHeaders = null;
    }

    return headers;
}; //parseHeaders

window.xhrPolyfill.bindEvent = function (target, eventName, handler) {
    var onEventName = 'on' + eventName;
    var previousHandler;
    if ('addEventListener' in target) return target.addEventListener(eventName, handler, false);
    if ('attachEvent' in target) return target.attachEvent(onEventName, handler);

    if (onEventName in target) {
        previousHandler = target[onEventName];
        target[onEventName] = previousHandler ? function () {
            previousHandler.apply(this, arguments);
            handler.apply(this, arguments);
        } : handler;

        return;
    }

    throw "could not bind to event '" + eventName + "'";
}; //bindEvent

window.xhrPolyfill.resolveUrl = function (url) {
    var a = document.createElement('a');
    a.href = url;
    return a.href;
}; //resolveUrl

window.xhrPolyfill.receiveMessage = function (e, source) {
    var message;

    if (e.source !== source) return null;

    message = e.data;

    if (typeof message === 'string') {
        if (message[0] !== '{') return null;

        message = JSON.parse(message);
    }

    if (typeof message !== 'object') return null;

    return message;
}; //receiveMessage


window.xhrPolyfill.xhrSend = function (options, statechange) {
    var headerName;
    var headers;

    var xhr = window.xhrPolyfill.originalXMLHttpRequest ? new window.xhrPolyfill.originalXMLHttpRequest() : (function () {
        try {
            return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (e1) {}
        try {
            return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
        } catch (e2) {}
        try {
            return new window.ActiveXObject("Msxml2.XMLHTTP");
        } catch (e3) {}
        throw new Error("This browser does not support XMLHttpRequest.");
    })();

    xhr.onreadystatechange = function () {
        var state = {};
        state.id = options.id;
        state.readyState = this.readyState;
        switch (this.readyState) {

        case 1:
        case 2:
        case 3:
            break;

        case 4:
            state.responseBody = this.responseText;
            state.responseHeaders = this.getAllResponseHeaders();
            state.statusCode = this.status;
            state.statusText = this.statusText;
            break;

        default:
            throw new Error('invalid state');
        }
        statechange(state);
    };

    xhr.open(options.method, options.url, true, options.username, options.password);

    if (options.requestHeaders) {
        headers = window.xhrPolyfill.parseHeaders(options.requestHeaders);
        for (headerName in headers) {
            xhr.setRequestHeader(headerName, headers[headerName]);
        }
    }

    xhr.send(options.requestBody);
}; //xhr
/* jshint browser: true */

window.xhrPolyfill = window.xhrPolyfill || {};

window.xhrPolyfill.bindEvent(window, 'message', function (e) {
    var message, channel;

    if (!(e.origin in window.xhrPolyfill.channels)) return;
    channel = window.xhrPolyfill.channels[e.origin];

    if (!(message = window.xhrPolyfill.receiveMessage(e, channel.iframe.contentWindow))) return;

    channel.onreceive && channel.onreceive(message);
});

window.xhrPolyfill.IFrameChannel = function (url) {
    var channel = this;

    url = window.xhrPolyfill.resolveUrl(url);
    channel.origin = window.xhrPolyfill.getOrigin(url);

    channel.send = function (message) {
        var messageQueue = [message];

        channel.send = function (message) {
            messageQueue.push(message);
        }; //send

        channel.iframe = document.createElement('iframe');
        window.xhrPolyfill.bindEvent(channel.iframe, 'load', function (e) {
            var message;

            channel.send = function (message) {
                channel.iframe.contentWindow.postMessage(JSON.stringify(message), channel.origin);
            }; //send

            while ( !! (message = messageQueue.shift())) {
                channel.send(message);
            }
            messageQueue = null;
        });

        channel.iframe.src = url;
        channel.iframe.style.display = 'none';
        document.scripts[0].parentNode.insertBefore(channel.iframe, document.scripts[0]);

    }; //send

    this.onreceive = null;

}; //IFrameChannel
/* jshint browser: true */

window.xhrPolyfill = window.xhrPolyfill || {};

window.xhrPolyfill.channels = {};
window.xhrPolyfill.proxies = {};
window.xhrPolyfill.idSequence = 0;
window.xhrPolyfill.xhrChannelPath = '/xhr-channel.html';

window.xhrPolyfill.ensureChannel = function (url) {
    var origin;
    url = window.xhrPolyfill.resolveUrl(url);
    origin = window.xhrPolyfill.getOrigin(url);
    if (!(origin in window.xhrPolyfill.channels)) window.xhrPolyfill.channels[origin] = window.xhrPolyfill.createChannel(url);

    return window.xhrPolyfill.channels[origin];
}; //ensureChannel

window.xhrPolyfill.createChannel = function (url) {
    var channel = new window.xhrPolyfill.IFrameChannel(url);

    window.xhrPolyfill.bindEvent(channel, 'receive', function (state) {
        var proxy;

        if (!(state.id in window.xhrPolyfill.proxies)) return false;

        proxy = window.xhrPolyfill.proxies[state.id];

        if (state.readyState === 4) delete window.xhrPolyfill.proxies[state.id];

        window.xhrPolyfill.xhrReceive(proxy, state);
    });
    return channel;
}; //createChannel

window.xhrPolyfill.xhrReceive = function (proxy, state) {
    var responseHeaders;

    responseHeaders = window.xhrPolyfill.parseHeaders(state.responseHeaders);

    proxy.readyState = state.readyState;
    proxy.status = state.statusCode;
    proxy.statusText = state.statusText;
    proxy.responseText = state.responseBody;

    proxy.getAllResponseHeaders = function () {
        return state.responseHeaders;
    };
    proxy.getResponseHeader = function (name) {
        name = name.toLowerCase();
        if (!(name in responseHeaders)) return undefined;
        return responseHeaders[name];
    };
    proxy.onreadystatechange && proxy.onreadystatechange(proxy);
}; //xhrReceive

window.xhrPolyfill.XMLHttpRequestProxy = function () {
    var id = (++window.xhrPolyfill.idSequence).toString(36);
    var proxy = this;
    var origin = null;
    var localOrigin = window.xhrPolyfill.getOrigin(location.href);
    var channel = null;

    var options = {
        id: id,
        requestHeaders: {}
    };

    this.onreadystatechange = null;
    this.readyState = 0;
    this.responseText = null;
    //this.responseXML = null;
    this.status = null;
    this.statusText = null;


    this.open = function (method, url, async, username, password) {
        if (async === false) throw 'only asynchronous behavior is supported';

        url = window.xhrPolyfill.resolveUrl(url);
        origin = window.xhrPolyfill.getOrigin(url);

        options.method = method;
        options.url = url;
        options.username = username;
        options.password = password;
    };

    this.send = function (data) {

        options.requestBody = data;

        if (localOrigin == origin) {
            window.xhrPolyfill.xhrSend(options, function (state) {
                window.xhrPolyfill.xhrReceive(proxy, state);
            });
        } else {
            window.xhrPolyfill.proxies[id] = this;

            channel = window.xhrPolyfill.ensureChannel(origin + window.xhrPolyfill.xhrChannelPath);

            channel.send(options);
        }
    };
    this.abort = function () {};

    this.setRequestHeader = function (name, value) {
        name = name.toLowerCase();
        options.requestHeaders[name] = value;
    };
    this.getAllResponseHeaders = function () {
        return;
    };
    this.getResponseHeader = function (name) {
        return;
    };

}; //XMLHttpRequestProxy

/*
use the proxy in ie < 10
*/
if (document.documentMode && document.documentMode < 10) {
    window.XMLHttpRequest = window.xhrPolyfill.XMLHttpRequestProxy;
}