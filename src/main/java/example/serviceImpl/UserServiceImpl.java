package example.serviceImpl;

import example.dao.UserDao;
import example.pojo.User;
import example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User login(String username, String password) {
        User user = userDao.findByNameAndPassword(username,password);
        return user;
    }

    @Override
    public void logout(User user) {

    }

    @Override
    public void register(User user) {
        userDao.addUser(user);
    }

    @Override
    public void destroy(User user) {
        userDao.deleteById(user.getId());
    }

    @Override
    public String getUserName(Integer id){return userDao.findNameById(id);}

    @Override
    public boolean isExist(String name) {
        if(userDao.countByName(name)>0){
            return true;
        }
        return false;
    }
}
