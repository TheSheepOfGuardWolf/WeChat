package example.service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;

public interface FriendService {
    boolean isFriend(Integer master, Integer guest);
    void addFriend(Integer master, Integer guest);
    void deleteFriend(Integer master, Integer guest);
    ArrayList<Integer> getFriendList(Integer master);
}
