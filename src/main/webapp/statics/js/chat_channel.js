/**
 * 获取聊天栏信息
 * @param type
 * @param id
 * @returns {*}
 */
function getChatChannel(info){
    var id = info["id"];
    var type = info["type"];
    var str_info = sessionStorage["channel_info:" + id + type];
    var channel_info = {};
    if(str_info == null){

        if(type == 'public'){
            var obj_info = getGroupInfo(id)
            var channel_info = {};
            channel_info["name"]=obj_info["name"];
            channel_info["type"] = type;
            channel_info["id"] = id;
            channel_info["lastTime"] = "";
            channel_info["lastMsg"] = "";
            channel_info["avatar"] = obj_info["avatar"];
            channel_info["html"] = "";
            sessionStorage["channel_info:" + id + type] = JSON.stringify(channel_info);
            sessionStorage["channel_html:" + id + type] = "";
            console.log("加载聊天窗口信息："+channel_info)
        }
        if(type == 'private'){
            var obj_info = getUserInfo(id)
            channel_info["name"]=obj_info["name"];
            channel_info["type"] = type;
            channel_info["id"] = id;
            channel_info["lastTime"] = "";
            channel_info["lastMsg"] = "";
            channel_info["avatar"] = obj_info["avatar"];
            channel_info["html"] = "";
            sessionStorage["channel_info:" + id+ type] = JSON.stringify(channel_info);
            sessionStorage["channel_html:" + id + type] = "";
            console.log("加载聊天窗口信息："+channel_info)
        }
    }
    else{
        channel_info = JSON.parse(str_info)
    }
    return channel_info;
}

/**
 * 生成新的聊天栏
 * @param channel_info
 */
function createChatItem(channel_info){
    var strHtml = '<li class="channel"' + ' type=' + channel_info["type"] + ' peer_id=' + channel_info["id"] + '>' +
        '<div class="avatar">' +
        '<img src='+channel_info["avatar"]+'>' +
        '</div>' +
        '<div class="channel_info">' +
        '<div class="first_line">' +
        '<div class="name">' + channel_info["name"] + '</div>' +
        '<div class="time">'+channel_info["lastTime"]+'</div>' +
        '</div>' +
        '<div class="second_line">' +
        '<div class="preview">'+channel_info["lastMsg"]+'</div>' +
        '<img class="alert">' +
        '</div>' +
        '</div>' +
        '</li>';
    channel_list.innerHTML = strHtml + channel_list.innerHTML;
    var child = channel_list.querySelectorAll('.channel');
    for(var i=0;i<child.length;i++){
        child[i].addEventListener('click', onMenuClickListener);
    }
}

/**
 * 更新聊天栏
 * @param info
 */
function updateChatItem(channel_info){
    var item = channel_list.querySelector('.channel[type="'+channel_info["type"]+'"][peer_id="'+channel_info["id"]+'"]');

    if(item == null){
        createChatItem(channel_info);
        item = channel_list.querySelector('.channel[type="'+channel_info["type"]+'"][peer_id="'+channel_info["id"]+'"]');
        upChatItem(item);
    }else{
        item.querySelector(".preview").innerHTML = channel_info["lastMsg"];
        item.querySelector(".time").innerHTML=channel_info["lastTime"];
        upChatItem(item);

        //保存
        // sessionStorage["channel_html:" + channel_info["id"] + channel_info["type"]] = JSON.stringify(channel_info);
    }


}

/**
 *置顶聊天栏
 * @param window
 */
function upChatItem(item){
    var parent = item.parentElement;
    parent.removeChild(item);
    parent.prepend(item);
}

/**
 * 更新聊天窗口消息
 * @param info
 * @param msg
 */
function updateChatMsg(channel_info,msg){
    var old_html = sessionStorage["channel_html:" + channel_info["type"] + channel_info["id"]];
    if( old_html== null){
        old_html = "";
    }
    sessionStorage["channel_html:" + info["id"] + info["type"]] = JSON.stringify(old_html + getMsgHtml(msg));
}

function checkChatItem(item){
    //聊天窗口改变
    var selectedElem = document.querySelector('.friend[selected=true]');
    if(selectedElem != null){
        selectedElem.setAttribute('selected','false');
    }
    this.setAttribute('selected','true')
    var type = this.getAttribute('type');

    var toName = this.querySelector(".name").innerText;;

    //保存旧的html
    if(current_info != null){
        sessionStorage["html:"+current_info["type"]+current_info["id"]]=Words.innerText;
    }
    //提取新的info
    current_info = JSON.parse(sessionStorage["info:"+type+toId]);
    updateChatWindow(toId,type);
}

/**
 * 保存当前窗口聊天信息
 * @param html
 * @param channel_info
 */
function saveChatHtml(channel_info,html){
    sessionStorage["channel_html:"+channel_info["id"]+channel_info["type"]]=html;
}

/**
 * 加载聊天信息
 * @param channel_info
 * @returns {any}
 */
function loadChatHtml(channel_info){
    return sessionStorage["channel_html:"+channel_info["id"]+channel_info["type"]];
}


function saveAddedHtml(channel_info, addedHtml){
    var preHtml = loadChatHtml(channel_info);
    if(preHtml == null){
        preHtml = "";
    }
    saveChatHtml(channel_info,preHtml+addedHtml);
}


function saveChannelInfo(channel_info){
    sessionStorage["channel_info:" + channel_info["id"]+ channel_info["type"]] = JSON.stringify(channel_info);
}