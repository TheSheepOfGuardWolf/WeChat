function login() {
    var err_message = document.getElementById("err_message")
    var username = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    sessionStorage.userName = username;
    var str = "username="+username+"&password="+pass;
    postInfo("session", str,function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                console.log("成功登录");
                var userId = this.responseText;
                sessionStorage.userId = userId;
                window.location.href = "main"
            } else {
                // console.log("登录失败，请重新登录");
                err_message.innerText= this.responseText;
                // window.location.href="login";
            }
        }
    });
    // var xhr = GetXmlHttpObject();
    // check(username,pass);
    // function check(userName, passwd){
    //
    //     var url = "session";
    //     xhr.onreadystatechange = toPostProcess;
    //     xhr.open("post", url, false);
    //     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //     str = "username="+userName+"&password="+passwd;
    //     xhr.send(str)
    //     if(xhr.readyState == 4 && xhr.status == 200){
    //         res = xhr.responseText;
    //         console.log("userId:" +res);
    //         if(res != "fail"){
    //             sessionStorage.userId = res;
    //             return;
    //         }
    //
    //     }
    //     alert("登录失败，重新登录")
    //     window.location.href="login";
    //     console.log("ok");
    // }
    //
    // function toPostProcess() {/*设置当获XHR对象获取到返回信息后执行以下代码*/
    //     if (xhr.readyState === 4) {
    //         if (xhr.status === 200) {
    //             res = xhr.responseText;
    //             //var obj = eval ("(" + res + ")");
    //             console.log("userId:" +res);
    //             if(res == "fail"){
    //                 alert("登录失败，重新登录")
    //                 window.location.href="login";
    //             }
    //             sessionStorage.userId = res;
    //
    //         } else {
    //             console.log("可能存在跨域问题，解决即可");
    //         }
    //         window.location.href="main";
    //     }
    // }


}
