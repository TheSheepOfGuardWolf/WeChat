function register() {
    var err_message = document.getElementById("err_message")
    var username = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var pass_conf = document.getElementById("password_confirm").value;
    if(username == "" || pass == ""){
        err_message.innerHTML = "用户名和密码不能为空";
        return;
    }
    if(pass != pass_conf){
        err_message.innerHTML = "两次输入密码不一致";
        return;
    }
    var str = str = "username="+username+"&password="+pass;
    postInfo("user", str,function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                console.log("成功注册");
                window.location.href = "login"
            } else {
                err_message.innerHTML = this.responseText;
            }
        }
    });
}
