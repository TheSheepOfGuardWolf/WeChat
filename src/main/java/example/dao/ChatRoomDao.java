package example.dao;

import example.pojo.ChatRoom;
import org.omg.PortableInterceptor.INACTIVE;

import java.util.ArrayList;

public interface ChatRoomDao {
    void addChatRoom(ChatRoom chatRoom);
    String getNameById(Integer roomId);
//    void deleteChatRoom(ChatRoom chatRoom);
//    void deleteChatRoomById(Integer roomId);
//    ChatRoom findChatRoomById(Integer roomId);

//    void updateMemNumber(Integer roomId);
}
