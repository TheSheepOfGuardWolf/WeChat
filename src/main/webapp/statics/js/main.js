var Words;
var TalkWords;
var TalkSub;

var ws;
var userId;
// var roomId;
// var type;
var userName;
// var roomName;
// var toName;
// var toId;
// var lastTime = new Date("0");
var time_interv = 1000*60*3;

var current_info;
var channel_id = 0;
var channel_list;

function InputPress() {
    chatRoom();
}
function EnterPress() {
    if (event.keyCode == 13){
        chatRoom();
        event.preventDefault();
        return false;
    }
}

function chatRoom(){
    //定义空字符串
    var str = "";
    if(TalkWords.value == ""){
        // 消息为空时弹窗
        alert("消息不能为空");
        return;
    }
    // str ='<div class="btalk">'+'<div class="bname">'+userName+'</div>'+'<span>' + TalkWords.value +'</span></div>' ;
    var timeStamp=new Date().toString();
    var msg;
    if(current_info["type"] == 'public'){
        msg = createMsg(0x0001, TalkWords.value,userId,current_info["id"],timeStamp );
        toSendMessage(msg);
    }
    if(current_info["type"]  == 'private'){
        msg = createMsg(0x0002, TalkWords.value, userId, current_info["id"] , timeStamp);
        toSendMessage(msg);
    }
    // toSendMessage(0x0001, TalkWords.value, userId, roomId, timeStamp);
    handleMesage(msg);
}

function showPeerMessage(msg, page){
    var current_time = new Date(msg.timeStamp);
    current_info["lastTime"]=current_time.toString();
    current_info["lastMsg"]=msg.content;
    if(current_time - lastTime >time_interv ){
        showSystemInfo(current_time.format("yyyy-MM-dd hh:mm:ss"));
        lastTime = current_time;
    }
    // fromUserName = getResource("user/"+msg.fromUserId+"/name");
    getInfo("user/"+msg.fromUserId+"/name",function(){
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var res = this.responseText;
            console.log("成功对方名称:"+res);

            fromUserName = res;
            str ='<div class="atalk">'+'<div class="aname">'+fromUserName+'</div>'+'<span>' + msg.content +'</span></div>' ;
            page = page + str;
            // Words.scrollTop = Words.scrollHeight;

            //保存页面
            // current_info["html"]=Words.innerHTML;
        }
    });

}
function showMyMessage(msg,page){
    var current_time = new Date(msg.timeStamp);
    current_info["lastTime"]=current_time.toString();
    current_info["lastMsg"]=msg.content;
    if(current_time - lastTime >time_interv ){
        showSystemInfo(current_time.format("yyyy-MM-dd hh:mm:ss"));
        lastTime = current_time;
    }
    str ='<div class="btalk">'+'<div class="bname">'+userName+'</div>'+'<span>' + msg.content +'</span></div>' ;
    page = page + str;
    // TalkWords.value = "";
    // Words.scrollTop = Words.scrollHeight;
    //
    // //保存页面
    // current_info["html"]=Words.innerHTML;
}
function showSystemInfo(content,page){

    str ='<div class="info"><span id="asay">'+content+'</span></div>';
    page=page + str;
    // Words.scrollTop = Words.scrollHeight;
}



//is moblie
var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsMidp = sUserAgent.match(/midp/i) == "midp";
var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";



window.onload = function(){
    Words = document.getElementById("words");
    TalkWords = document.getElementById("talkwords");
    TalkSub = document.getElementById("talksub");

    TalkWords.disabled = true;
    TalkSub.disabled = true;

    channel_list = document.getElementById("friend_list");
    current_info = {"id":"","type":""};
    // xhr = new GetXmlHttpObject();
    // userId = '<%=session.getAttribute("userId")%>';
    userId = sessionStorage.userId;
    userName = sessionStorage.userName;
    console.log("userId:"+userId);
    console.log("userName:"+userName);
    //is mobile
    // if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    //     console.log("手机");
    //     document.getElementById('talk_con_id').className = 'talk_con_mob';
    //     document.getElementById('words').className = 'talk_show_mob';
    //     document.getElementById('talk_input_id').className = 'talk_input_mob';
    //     document.getElementById('talkwords').className = 'talk_word_mob';
    // } else {
    //     console.log("电脑");
    //     document.getElementById('talk_con_id').className = 'talk_con';
    //     document.getElementById('words').className = 'talk_show';
    //     document.getElementById('talk_input_id').className = 'talk_input';
    //     document.getElementById('talkwords').className = 'talk_word';
    // }

    //将当前用户加入群聊：1
    // roomId = 2;
    // postInfo("chatroom/"+roomId+"/"+userId,null,function(){
    //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //         console.log("成功加入群聊")
    //     }
    // });
    // getInfo("chatroom/"+roomId+"/roomName",function(){
    //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //         var res = this.responseText;
    //         console.log("成功获取群名称:"+res);
    //
    //         roomName = res;
    //         showSystemInfo("欢迎进入聊天室，房间名："+res);
    //     }
    // });

    //获取websocket
    ws = getWebSocket();

    //与服务器连接时
    ws.onopen = onOpen;

    // 接收服务端数据时触发事件
    ws.onmessage = onMessage;

    // 断开 web socket 连接成功触发事件
    ws.onclose = onClose;

    //menu窗口好友信息控制
    memberManage();



}

function onMenuClickListener() {
    console.log(this);

    // var toId = this.getAttribute('name');
    //仍然点击当前聊天窗口
    // if (current_info != null && toId == current_info["id"]) {
    //     return;
    // }
    TalkWords.disabled = false;
    TalkSub.disabled = false;

    //聊天窗口改变
    var selectedElem = document.querySelector('.channel[selected=true]');
    if(selectedElem != null){
        selectedElem.setAttribute('selected','false');
    }
    this.setAttribute('selected','true')
    var type = this.getAttribute('type');

    var id = this.getAttribute("peer_id");

    var info = {};
    if(type == "private"){
        info = getUserInfo(id);
    }
    if(type == "public"){
        info = getGroupInfo(id);
    }

    var channel_info = getChatChannel(info);
    //保存旧的html
    if(current_info != null){
        saveChatHtml(current_info,Words.innerHTML);
    }
    //提取新的info
    updateChatWindow(channel_info);
    current_info = channel_info;
}


