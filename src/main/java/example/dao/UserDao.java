package example.dao;

import example.pojo.User;
import org.apache.ibatis.annotations.Param;

public interface UserDao {
    Integer addUser(User u);

    User findById(Integer id);

    //mybatis有多个参数时需要@param进行注解
    User findByNameAndPassword(@Param("name")String name,@Param("passwd")String passwd);

    Integer deleteById(Integer id);

    String findNameById(Integer id);

    Integer countByName(String name);
}
