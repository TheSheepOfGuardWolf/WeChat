function getMsgHtml(msg){
    /**
     * 应该用聊天窗口来map】
     *
     * @type {Date}
     */
    //

    var sender_info = getUserInfo(msg.fromUserId);
    // var receiver_info = getUserInfo(msg.toId,msgType);
    //
    var peer_info = getPeerInfoFromMsg(msg);
    var channel_info = getChatChannel(peer_info);
    var strHtml = "";
    var last_time = new Date("0");;
    // //应该以聊天窗口
    if(channel_info["lastTime"] == ""){
        last_time = new Date("0");
    }else{
        last_time = new Date(channel_info["lastTime"]);
    }
    var current_time = new Date(msg.timeStamp);
    if(current_time-last_time > time_interv){
        strHtml += getSysInfoHtml(current_time.format("yyyy/MM/dd hh:mm:ss"));
        channel_info["lastTime"] = current_time;
        // saveChannelInfo(channel_info);
    }
    if(msg.fromUserId == userId){
        strHtml +='<div class="btalk">'+'<div class="bname">'+userName+'</div>'+'<span>' + msg.content +'</span></div>' ;
    }else{
        strHtml +='<div class="atalk">'+'<div class="aname">'+sender_info["name"]+'</div>'+'<span>' + msg.content +'</span></div>' ;
    }

    //更新info
    return strHtml;


}

function getSysInfoHtml(str){
    var strHtml = "";
    strHtml = '<div class="info"><span id="asay">'+str+'</span></div>';
    return strHtml;
}

