package example.dao;

import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface FriendDao {
    void add(@Param("master")Integer master, @Param("guest") Integer guest);
    void delete(@Param("master")Integer master, @Param("guest") Integer guest);
    Integer check(@Param("master")Integer master, @Param("guest") Integer guest);
    ArrayList<Integer> findAllGuestByMaster(Integer master);
}
