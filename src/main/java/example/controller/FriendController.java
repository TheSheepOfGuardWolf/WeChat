package example.controller;

import example.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;

@Controller
@RequestMapping("friend")
public class FriendController {

    @Autowired
    private FriendService friendService;

    /**
     * 添加好友
     */
    @RequestMapping(value="/{master}/{guest}",method = RequestMethod.POST)
    @ResponseBody
    public String addFriend(@PathVariable("master")Integer master,
                          @PathVariable("guest") Integer guest){
        if(!friendService.isFriend(master,guest)){
            friendService.addFriend(master,guest);
        }
        return null;
    }

    /**
     * 删除好友
     */
    @RequestMapping(value="/{master}/{guest}",method = RequestMethod.DELETE)
    public void deleteFriend(@PathVariable("master")Integer master,
                             @PathVariable("guest") Integer guest) {
        if (friendService.isFriend(master, guest)) {
            friendService.deleteFriend(master, guest);
        }
    }

    /**
     * 获取好友列表
     */
    @RequestMapping(value="/{master}",method = RequestMethod.GET)
    @ResponseBody
    public String getFriendList(@PathVariable("master") Integer master){
        ArrayList<Integer> friendList = friendService.getFriendList(master);
        if(friendList.size() == 0){
            return "";
        }
        String listStr = new String();
        for(Integer guestId:friendList){
            listStr += guestId.toString()+",";
        }
        System.out.println("该用户有好友："+listStr);
        return listStr.substring(0,listStr.length()-1);
    }
}
