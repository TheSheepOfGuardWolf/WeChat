<%--
  Created by IntelliJ IDEA.
  User: smart
  Date: 2020/6/2
  Time: 16:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
    <script type="text/javascript" src="js/login.js"></script>
    <script type="text/javascript" src="js/web.js"></script>
    <link rel="stylesheet" type="text/css" href="css/login.css">
</head>

<body>
<div id="login_frame">

    <p id="title">聊天室</p>

    <form>

        <p><label class="label_input">用户名</label><input type="text" id="username" class="text_field"/></p>
        <p><label class="label_input">密码</label><input type="password" id="password" class="text_field"/></p>

        <div id="login_control">
            <div id="err_message"></div>
            <input type="button" id="btn_login" value="登录" onclick="login();"/>
            <a id="forget_pwd" href="register">注册账号？</a>
        </div>
    </form>
</div>

</body>
</html>


