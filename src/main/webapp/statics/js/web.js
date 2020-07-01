function GetXmlHttpObject() {
    var xmlHttp = null;
    try {
        // Firefox, Opera 8.0+, Safari
        console.log("XMLHttpRequest");
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            console.log("Msxml2");
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            console.log("Microsoft");
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

function getWebSocket(){
    var wsUri = getRootUri() + "/app/websocket/"+userId;
    var ws = new WebSocket(wsUri);
    // 建立 web socket 连接成功触发事件

    return ws;
}

function getInfo(url,waitResponse){
    var xhr = GetXmlHttpObject();
    xhr.onreadystatechange = waitResponse;
    xhr.open("get", url, true);
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // str = "username="+userName+"&password="+passwd;
    xhr.send(null)
}

function asynGetInfo(url){
    var xhr = GetXmlHttpObject();
    xhr.open("get", url, false);
    xhr.send(null);
    if(xhr.status == 200){
        return xhr.responseText;
    }
}
function postInfo(url,str, waitResponse){
    var xhr = GetXmlHttpObject();
    xhr.onreadystatechange = waitResponse;
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // str = "username="+userName+"&password="+passwd;
    xhr.send(str)
}

// function getResource(url) {
//
//     var xhr = GetXmlHttpObject();
//     // xhr.onreadystatechange = toPostProcess;
//     xhr.open("get", url, false);
//     // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     // str = "username="+userName+"&password="+passwd;
//     xhr.send(null)
//     if (xhr.status === 200) {
//         console.log("ok");
//         var res = xhr.responseText;
//         console.log("获取资源："+res);
//         return res;
//     }
// }




function getRootUri() {
    return "ws://" + (document.location.hostname == "" ? "localhost" : document.location.hostname) + ":" +
        (document.location.port == "" ? "8080" : document.location.port);
}

function ajax(URL) {
    return new Promise(function (resolve, reject) {
        var req = GetXmlHttpObject();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}