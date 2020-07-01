/**
 * 更换聊天窗
 */
function updateChatWindow(channel_info){

    //清空输入框消息
    TalkWords.value="";
    //导入本地聊天信息
    Words.innerHTML = sessionStorage["channel_html:"+channel_info["id"]+channel_info["type"]];
    Words.scrollTop = Words.scrollHeight;
    //显示系统消息
}

/**
 * 当websocket接收到信息
 * @param evt
 */
function onMessage(evt) {
    var received_msg = evt.data;
    console.log("数据已接收..."+received_msg);
    var json_msg = JSON.parse(received_msg);
    handleMesage(json_msg);

}

/**
 * websocket连接建立时
 */
function onOpen() {
    // 使用 send() 方法发送数据
    // ws.send("发送数据");
    alert("已连接服务器...");
}

/**
 * websocket 关闭时
 */
function onClose() {
    alert("连接已关闭...");
}

/**
 * 构造msg
 */
function createMsg(msgType,content,fromUserId, toId, timeStamp){
    var msg = {
        "msgId":10,
        "msgType":msgType,
        "content": content,
        "fromUserId": fromUserId,
        "toId": toId,
        "timeStamp": timeStamp
    };
    return msg;
}

/**
 * 通过websocket发送消息
 */
function toSendMessage(msg){
    var data = JSON.stringify(msg);
    ws.send(data);
    console.log(data);
}

/**
 * 处理消息
 * @param msg
 */
function handleMesage(msg){
    var id;
    var type;
    // if(msg.msgType == 0x0001){
    //     id = msg.toId;
    //     type = "public";
    // }
    // if(msg.msgType == 0x0002){
    //     id = msg.toId;;
    //     type = "private";
    // }
    var info =getPeerInfoFromMsg(msg);
    var channel_info = getChatChannel(info);
    // id = info["id"];
    // type = info["type"];
    channel_info["lastTime"] = new Date(msg.timeStamp).format("yy/MM/dd hh:mm:ss");
    channel_info["lastMsg"] = msg.content;
    // updateInfo(info);
    updateChatItem(channel_info);
    //保存html
    var addHtml = getMsgHtml(msg,type);
    saveAddedHtml(channel_info,addHtml);

    //当前窗口
    if(channel_info["id"] == current_info["id"] && channel_info["type"] == current_info["type"]){
        updateChatWindow(channel_info);
    }
}

function getPeerInfoFromMsg(msg){
    var id;
    var info ={};
    if(msg.msgType == 0x0001){
        id = msg.toId;
        info = getGroupInfo(id);
    }
    if(msg.msgType == 0x0002){
        if(msg.fromUserId == userId){
            id = msg.toId;
        }
        else{
            id = msg.fromUserId;;
        }

        info = getUserInfo(id);
    }

    return info;
}