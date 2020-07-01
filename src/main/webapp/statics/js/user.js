/**
 * 返回用户信息
 */
function getUserInfo(id){
    var str_info = sessionStorage["user_info:" + id];
    var info={};
    if(str_info == null){
        console.log("当前用户未保存");

        // var promise = ajax("user/"+id+"/name");
        // 获取新用户
        //
        // promise.then(function (value) {
        //     info["name"]=value;
        //     info["type"] = "private";
        //     info["id"] = id;
        //     info["avatar"] = "images/avatar.png";
        //     sessionStorage["user_info:" + id] = JSON.stringify(info);
        //     console.log("加载用户信息："+info)
        // });
        info["name"]=asynGetInfo("user/"+id+"/name");
        info["type"] = "private";
        info["id"] = id;
        info["avatar"] = "images/avatar.png";
        sessionStorage["user_info:" + id] = JSON.stringify(info);
        console.log("加载用户信息："+info)

    }else{
        console.log("当前用户已保存");
        info=JSON.parse(str_info);
    }
    return info;
}


/**
 * 返回群信息
 * @param id
 */
function getGroupInfo(id){
    var str_info = sessionStorage["group_info:" + id];
    var info={};
    if(str_info == null){
        console.log("当前群未保存");

        // var promise = ajax("chatroom/"+id+"/roomName");
        // //获取群
        // promise.then(function (value) {
        //     info["name"]=value;
        //     info["type"] = "public";
        //     info["id"] = id;
        //
        //     info["avatar"] = "images/group-avatar.png";
        //     sessionStorage["group_info:" + id] = JSON.stringify(info);
        //     console.log("加载群信息："+info)
        // });
        info["name"]=asynGetInfo("chatroom/"+id+"/roomName");
        info["type"] = "public";
        info["id"] = id;

        info["avatar"] = "images/group-avatar.png";
        sessionStorage["group_info:" + id] = JSON.stringify(info);
        console.log("加载群信息："+info)

    }else{
        console.log("当前群已保存");
        info=JSON.parse(str_info);
    }
    return info;
}
