package example.controller;

import example.dao.UserDao;
import example.pojo.User;
import example.service.ChatRoomService;
import example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import sun.misc.Request;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

@Controller
@RequestMapping("/")
public class UserController {

    @Autowired(required = false)
    private UserService userService;

    @Autowired
    private ChatRoomService chatRoomService;

    //登录页面
    @RequestMapping(value="/login", method=RequestMethod.GET)
    public String login(){
        return "login";
    }

    //登录验证
    @RequestMapping(value="session",method=RequestMethod.POST)
    @ResponseBody
    public void checkUser(@RequestParam("username") String name,
                        @RequestParam("password") String passwd,
                            HttpServletResponse response) throws IOException {

        ModelAndView mav = new ModelAndView("message");
        User user = userService.login(name,passwd);
//        System.out.println(user.toString());
        if(user != null){
            System.out.println("login success");
//            session.setAttribute("userId",user.getId());
//            return user.getId().toString();

            response.setStatus(200);
            response.getWriter().append(user.getId().toString());
        }
        else{
            System.out.println("login failed");
            response.setStatus(400);

            String data = "账号密码不正确";
            response.setHeader("Content-type", "text/html;charset=UTF-8");

            response.setCharacterEncoding("UTF-8");

            response.getWriter().append(data);
        }
    }

    //注销登录
    @RequestMapping(value="session",method= RequestMethod.DELETE)
    public ModelAndView logout(HttpSession session){
        System.out.println("logout");
        session.invalidate();
        return null;
    }

    //注册页面
    @RequestMapping(value="/register")
    public String register(){
        return "register";
    }

    //注册账号
    @RequestMapping(value="/user", method = RequestMethod.POST)
    @ResponseBody
    public void addUser(@RequestParam("username") String name,
                        @RequestParam("password") String passwd,
                        HttpServletResponse response) throws IOException {
        if(userService.isExist(name)){
            response.setStatus(400);

            String data = "用户名已存在";
            response.setHeader("Content-type", "text/html;charset=UTF-8");

            response.setCharacterEncoding("UTF-8");

            response.getWriter().append(data);


        }else{
            User user = new User(name,passwd);
            userService.register(user);
            System.out.println(user.toString());
            response.setStatus(200);
        }

    }

    //销毁账号
    @RequestMapping(value="/user", method=RequestMethod.DELETE)
    public ModelAndView rmUser(@RequestParam("id") Integer id){

        return null;
    }

    //主界面
    @RequestMapping(value="/main")
    public String main(){
        //判断登录
        return "main";
    }

//    @RequestMapping(value = "/message",method=RequestMethod.GET)
//    public ModelAndView show(){
//        ModelAndView mav = new ModelAndView("message");
//        mav.addObject("name","123");
//        mav.addObject("passwd","123");
//        return mav;
//    }

    //获取用户名
    @RequestMapping(value="/user/{id}/name",method=RequestMethod.GET)
    @ResponseBody
    public String getUserName(@PathVariable(value = "id") Integer id){
        return userService.getUserName(id);
    }


    /**
     * getAllGroup 获取用户的所有群聊
     *
     */
    @RequestMapping(value="user/{userId}/chatroom",method = RequestMethod.GET)
    @ResponseBody
    public String getAllGroup(@PathVariable("userId") Integer userId){
        ArrayList<Integer> groupList = chatRoomService.getAllGroup(userId);
        if(groupList.size() == 0){
            return "";
        }
        String groupStr = new String();
        for(Integer roomId : groupList){
            groupStr += roomId.toString()+",";
        }
        return groupStr.substring(0,groupStr.length()-1);
    }
}
