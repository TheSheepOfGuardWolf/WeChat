package example.service;

import org.omg.CORBA.INTERNAL;

import java.util.ArrayList;

public interface ChatRoomService {
    ArrayList<Integer> getGroupMembers(Integer roomId);
    void addUserToRoom(Integer userId, Integer roomId);
    boolean checkUserInRoom(Integer userId, Integer roomId);
    String getRoomName(Integer roomId);
    ArrayList<Integer> getAllGroup(Integer userId);
}
