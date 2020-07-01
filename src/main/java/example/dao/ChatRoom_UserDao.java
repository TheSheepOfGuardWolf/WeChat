package example.dao;

import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface ChatRoom_UserDao {
    void add(@Param("roomId") Integer roomId, @Param("userId") Integer userId);
    void delete(@Param("roomId") Integer roomId, @Param("userId") Integer userId);
    ArrayList<Integer> findAllUserByRoomId(Integer roomId);
    Integer countByUserIdAndRoomId(@Param("roomId") Integer roomId, @Param("userId") Integer userId);
    ArrayList<Integer> findAllRoomByUserId(Integer userId);
}
