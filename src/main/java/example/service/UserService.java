package example.service;

import example.pojo.User;

public interface UserService {
    //通过用户名和密码核查用户登录
    User login(String username, String password);

    //退出登录
    void logout(User user);

    //注册用户
    void register(User user);

    //注销用户
    void destroy(User user);

    //查询用户名
    String getUserName(Integer id);

    //查询用户名是否已存在
    boolean isExist(String name);


}
