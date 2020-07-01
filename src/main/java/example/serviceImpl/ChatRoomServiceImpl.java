package example.serviceImpl;

import example.dao.ChatRoomDao;
import example.dao.ChatRoom_UserDao;
import example.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {
    @Autowired
    private ChatRoomDao chatRoomDao;

    @Autowired
    private ChatRoom_UserDao chatRoom_userDao;

    @Override
    public ArrayList<Integer> getGroupMembers(Integer roomId) {
        ArrayList<Integer> memberList = chatRoom_userDao.findAllUserByRoomId(roomId);
        return memberList;
    }

    @Override
    public void addUserToRoom(Integer userId, Integer roomId) {
        Integer count = chatRoom_userDao.countByUserIdAndRoomId(roomId, userId);
        if(count == 0){
            System.out.println("当前用户不在群组中，加入群组："+roomId +", "+userId);
            chatRoom_userDao.add(roomId,userId );
//            chatRoomDao.addChatRoom(new ChatRoom(1,"new room"));
            System.out.println("当前用户加入群组成功");
        }else{
            System.out.println("当前用户已在群组中");
        }
    }

    @Override
    public boolean checkUserInRoom(Integer userId, Integer roomId) {
        Integer count = chatRoom_userDao.countByUserIdAndRoomId(userId,roomId);
        if(count != 0){
            System.out.println("当前用户不在群组中，加入群组");
            return true;
        }
        System.out.println("当前用户已在群组中");
        return false;
    }

    @Override
    public String getRoomName(Integer roomId) {
        return chatRoomDao.getNameById(roomId);
    }

    @Override
    public ArrayList<Integer> getAllGroup(Integer userId){
        ArrayList<Integer> groupList = chatRoom_userDao.findAllRoomByUserId(userId);
        return  groupList;
    }

}
