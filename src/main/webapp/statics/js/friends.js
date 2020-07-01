var members;
var groups;
var friends;
var MemberList;
var FriendList;
var updated;
var FriendObj;

function memberManage(){
    MemberList = document.getElementById("member_list");
    FriendList = document.getElementById("friend_list");
    FriendObj = {};
    getAllGroup();

    //getMembers();
    getAllFriends();



    // document.querySelectorAll('.friend').onclick=function(){
    //     console.log(this);
    //     this.Sibling('li').removeClass('selected');
    //     this.addClass('selected');
    //     var choseId = this.getAttribute('name');
    //     var choseName = this.innerText;
    //     console.log("id:"+choseId);
    //     console.log("name:"+choseName);
    //
    //
    // }
    // document.querySelector('#member_list').onclick=function(e){
    //     var choseId = e.target.getAttribute('name');
    //     var choseName = e.target.innerText;
    //     console.log("id:"+choseId);
    //     console.log("name:"+choseName);
    //     var ans = confirm("是否添加["+choseName+"]为好友");
    //     if(ans){
    //         console.log("添加["+choseName+"]为好友")
    //     }
    // }
}

/**
 * 获取用户的所有群聊
 */
function getAllGroup(){
    getInfo("user/"+userId+"/chatroom",function () {
        if(this.readyState == XMLHttpRequest.DONE){
            if(this.status == 200){
                var res = this.responseText;
                console.log("用户有群："+res);

                groups = res.split(",");
                for(var i=0; i<groups.length; i++){
                    var info = getGroupInfo(groups[i]);
                    //显示
                    var channel_info = getChatChannel(info);
                    createChatItem(channel_info);
                }
                console.log("显示群完毕");
                // var child = FriendList.querySelectorAll('.friend[type="public"]');
                // for(var i=0;i<child.length;i++){
                //
                //     child[i].addEventListener('click', onMenuClickListener);
                // }

            }
        }
    });

}


/**
 * 获取所有好友
 */
function getAllFriends(){
    getInfo("friend/"+userId,function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var res = this.responseText;
            console.log("好友列表:"+res);

            friends = res.split(",");
            console.log(friends);
            for(var i=0; i<friends.length; i++){
                var info = getUserInfo(friends[i]);
                //显示
                var channel_info = getChatChannel(info);
                createChatItem(channel_info);
            }
            console.log("显示好友完毕");
            // var child = FriendList.querySelectorAll('.friend[type="private"]');
            // for(var i=0;i<child.length;i++){
            //     child[i].addEventListener('click', onMenuClickListener);
            // }
        }
    });
}

// function getMembers(){
//
//     getInfo("chatroom/"+roomId,function(){
//         if (this.readyState === XMLHttpRequest.DONE) {
//             if (this.status === 200) {
//                 var res = this.responseText;
//                 console.log(res);
//
//                 members = res.split(",");
//                 for(var i=0, len=members.length;i<len;i++){
//                     showMember(members[i]);
//                 }
//             }
//         }
//     });
// }

// function showFriend(id,type){
    // if(type == 'private'){
    //     getInfo("user/"+id+"/name",function () {
    //         if (this.readyState === XMLHttpRequest.DONE) {
    //             if (this.status === 200) {
    //                 var name = this.responseText;
    //
    //                 var info = {};
    //                 info["type"] = "private";
    //                 info["id"] = id;
    //                 info["name"] = name;
    //                 info["lastTime"] = "";
    //                 info["lastMsg"] = "";
    //                 info["avatar"] = "images/avatar.png";
    //                 info["html"] = "";
    //                 sessionStorage["info:" + type + id] = JSON.stringify(info);
    //
    //                 showNewInfo(info);
    //             }
    //         }
    //     });
    // }
    // if(type == 'public'){
    //     var roomName = getInfo("chatroom/"+id+"/roomName",function () {
    //         if (this.readyState === XMLHttpRequest.DONE) {
    //             if (this.status === 200) {
    //                 var roomName = this.responseText;
    //
    //                 var info = {};
    //                 info["type"] = "public";
    //                 info["id"] = id;
    //                 info["name"] = roomName;
    //                 info["lastTime"] = "";
    //                 info["lastMsg"] = "";
    //                 info["avatar"] = "images/group-avatar.png";
    //                 info["html"] = "";
    //                 sessionStorage["info:" + type + id] = JSON.stringify(info);
    //
    //                 showNewInfo(info);
    //             }
    //         }
    // });
    // }

//     var info = getUserInfo(id,type);
//     showNewInfo(info);
// }

function showNewInfo(info){
    var strHtml = '<li class="friend"' + ' type=' + info["type"] + ' name=' + info["id"] + '>' +
        '<div class="avatar">' +
        '<img src='+info["avatar"]+'>' +
        '</div>' +
        '<div class="friend_info">' +
        '<div class="first_line">' +
        '<div class="name">' + info["name"] + '</div>' +
        '<div class="time">'+info["lastTime"]+'</div>' +
        '</div>' +
        '<div class="second_line">' +
        '<div class="preview">'+info["lastMsg"]+'</div>' +
        '<img class="alert">' +
        '</div>' +
        '</div>' +
        '</li>';
    FriendList.innerHTML = strHtml + FriendList.innerHTML;
    var child = FriendList.querySelectorAll('.friend');
    for(var i=0;i<child.length;i++){
        child[i].addEventListener('click', onMenuClickListener);
    }
}

function updateInfo(info){
    var item = FriendList.querySelector('.friend[type="'+info["type"]+'"][name="'+info["id"]+'"]');
    if(item == null){
        showNewInfo(info);
    }else{
        item.querySelector(".preview").innerHTML = info["lastMsg"];
        item.querySelector(".time").innerHTML=info["lastTime"];
        upUser(item);

        // var old_info = sessionStorage["info:" + info["type"] + info["id"]];
        // if( old_info!= null){
        //     info["html"]=JSON.parse(old_info)["html"] + info["html"];
        // }
    }
    sessionStorage["info:" + info["type"] + info["id"]] = JSON.stringify(info);

}

/**
 * 控件上升置顶
 * @param item
 */
function upUser(item){
    var parent = item.parentElement;
    parent.removeChild(item);
    parent.prepend(item);
}


// function showMembers(members){
//     for(var id in members){
//         showMember(id);
//     }
// }
function showMember(id){
    getInfo("user/"+id+"/name",function(){
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var res = this.responseText;
            console.log("成功对方名称:"+id+":"+res);

            var name = res;
            str ='<div id="member" name='+ id+'>'+name+'</div><hr>';
            MemberList.innerHTML = MemberList.innerHTML + str;
            // Words.scrollTop = Words.scrollHeight;
        }
    });
}

/**
 * 监听点击事件
 */
// function onClickListener(){
//     console.log("点击:"+this);
// }


// function getUserInfo(id,type){
//     var str_info = sessionStorage["info:" + type+id];
//     var info={};
//     if(str_info == null){
//         console.log("当前用户未保存");
//
//         if(type == "public"){
//             var promise = ajax("chatroom/"+id+"/roomName");
//             promise.then(function (value) {
//                 info["name"]=value;
//                 info["type"] = type;
//                 info["id"] = id;
//                 info["lastTime"] = "";
//                 info["lastMsg"] = "";
//                 info["avatar"] = "images/group-avatar.png";
//                 sessionStorage["info:" + type+id] = JSON.stringify(info);
//                 console.log("加载用户信息："+info)
//             });
//         }
//         if(type == "private"){
//             var promise = ajax("user/"+id+"/name");
//             promise.then(function (value) {
//                 info["name"]=value;
//                 info["type"] = type;
//                 info["id"] = id;
//                 info["lastTime"] = "";
//                 info["lastMsg"] = "";
//
//                 info["avatar"] = "images/avatar.png";
//                 sessionStorage["info:" + type+id] = JSON.stringify(info);
//                 console.log("加载用户信息："+info)
//             });
//         }
//     }else{
//         console.log("当前用户已保存");
//         info=JSON.parse(str_info);
//     }
//     return info;
// }