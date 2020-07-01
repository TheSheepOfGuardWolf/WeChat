<%--
  Created by IntelliJ IDEA.
  User: smart
  Date: 2020/6/3
  Time: 11:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>聊天室</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/send_button.css">
    <link rel="stylesheet" type="text/css" href="css/friend.css">
    <link rel="stylesheet" type="text/css" href="css/scroll_bar.css">
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/web.js"></script>
    <script type="text/javascript" src="js/date.js"></script>
    <script type="text/javascript" src="js/chat_channel.js"></script>
    <script type="text/javascript" src="js/chat.js"></script>
    <script type="text/javascript" src="js/message_display.js"></script>
    <script type="text/javascript" src="js/user.js"></script>
    <script type="text/javascript" src="js/friends.js"></script>

</head>
<body>
<div class="app">

<div id="main_window">
    <div id="sidebar">

    </div>
    <div id="menu_window">
        <div id="search_bar">

        </div>
        <ul id="friend_list">
            <%--<li class="friend">--%>
                <%--<div class="avatar">--%>
                    <%--<img src="images/avatar.png">--%>
                <%--</div>--%>
                <%--<div class="friend_info">--%>
                    <%--<div class="first_line">--%>
                        <%--<div class="name">姓名</div>--%>
                        <%--<div class="time">19/4/12</div>--%>
                    <%--</div>--%>
                    <%--<div class="second_line">--%>
                        <%--<div class="preview">预览信息</div>--%>
                        <%--<img class="alert">--%>
                    <%--</div>--%>
                <%--</div>--%>

            <%--</li>--%>
        </ul>

    </div>
    <div id="chat_window">
        <div id="title_bar">

        </div>
        <hr>
        <div class="talk_show" id="words">
        <%--<div class="info"><span id="asay">${message}</span></div>--%>
        <!--- div class="btalk"><span id="bsay">用户说：还没呢，你呢？</span></div --->
        </div>
        <div class="talk_input"  id="talk_input_id">
            <div class="tool_bar">

            </div>
            <textarea type="text" class="talk_word" id="talkwords" onkeypress="EnterPress()"></textarea>
            <div class="foot">
                <button class="talk_sub" id="talksub" onclick="InputPress()" >发送(S)</button>
            </div>

        </div>
    </div>

</div>
<div id="extra_window">
    <div id="member_list">
        <%--<div id="member">--%>
        <%--<div id="member_name">smart</div>--%>
        <%--<button>加为好友</button>--%>
        <%--</div>--%>
        <%--<br>--%>
    </div>
</div>
</div>
</body>
</html>
