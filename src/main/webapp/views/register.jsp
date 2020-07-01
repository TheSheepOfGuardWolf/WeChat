<%--
  Created by IntelliJ IDEA.
  User: smart
  Date: 2020/6/2
  Time: 14:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" import="java.util.*" isELIgnored="false"%>
<html>
<head>
    <title>注册</title>
    <script type="text/javascript" src="js/register.js"></script>
    <script type="text/javascript" src="js/web.js"></script>
    <link rel="stylesheet" type="text/css" href="css/register.css">
</head>
<body>
<div id="login_frame">

    <p id="title">注册账号</p>

    <form>

        <p><label class="label_input">用户名</label><input type="text" id="username" class="text_field"/></p>
        <p><label class="label_input">密码</label><input type="password" id="password" class="text_field"/></p>
        <p><label class="label_input">确认密码</label><input type="password" id="password_confirm" class="text_field"/></p>

        <div id="register_control">
            <div id="err_message"></div>
            <input type="button" id="btn_register" value="注册" onclick="register();"/>
        </div>
    </form>
</div>

</body>
</html>
