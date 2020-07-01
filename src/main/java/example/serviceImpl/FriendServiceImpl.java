package example.serviceImpl;

import example.dao.FriendDao;
import example.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class FriendServiceImpl implements FriendService {
    @Autowired
    private FriendDao friendDao;

    @Override
    public boolean isFriend(Integer master, Integer guest) {
        if(friendDao.check(master,guest)==0){
            return false;
        }
        return true;
    }

    @Override
    public void addFriend(Integer master, Integer guest) {
        friendDao.add(master,guest);
    }

    @Override
    public void deleteFriend(Integer master, Integer guest) {
        friendDao.delete(master,guest);
    }

    @Override
    public ArrayList<Integer> getFriendList(Integer master) {
        return friendDao.findAllGuestByMaster(master);
    }
}
