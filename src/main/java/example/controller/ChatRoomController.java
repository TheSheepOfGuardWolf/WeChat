package example.controller;

import example.pojo.ChatRoom;
import example.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;

@Controller
@RequestMapping(value="/chatroom")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    /**
     * joinRoom 加入群聊房间
     * @param roomId
     * @param userId
     * @return
     */
    @RequestMapping(value = "/{roomId}/{userId}",method = RequestMethod.POST)
    @ResponseBody
    public String joinRoom(@PathVariable("roomId") Integer roomId,
                           @PathVariable("userId") Integer userId){
        System.out.println("访问chatroom");
        chatRoomService.addUserToRoom(userId,roomId);
        return null;
    }



    /**
     * getMemberList 获取群聊成员
     * @param roomId
     * @return
     */
    @RequestMapping(value="/{roomId}",method = RequestMethod.GET)
    @ResponseBody
    public  String  getMemberList(@PathVariable("roomId") Integer roomId){
        ArrayList<Integer> memberList =  chatRoomService.getGroupMembers(roomId);
        if(memberList.size() == 0){
            return "";
        }
        String listStr = new String();
        for(Integer userId:memberList){
            listStr += userId.toString()+",";
        }
        System.out.println("当前群组有用户："+listStr);
        return listStr.substring(0,listStr.length()-1);
    }

    /**
     * 获取群名称
     * @param roomId
     * @return
     */
    @RequestMapping(value="/{roomId}/roomName", method=RequestMethod.GET)
    @ResponseBody
    public String getRoomName(@PathVariable("roomId") Integer roomId){
        System.out.println("chatroom Controller 接收 查找roomName");
        return chatRoomService.getRoomName(roomId);
    }

}
