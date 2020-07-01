package example.web;
import com.fasterxml.jackson.databind.ObjectMapper;
import example.pojo.ChatRoom;
import example.pojo.Message;
import example.service.ChatRoomService;
import jdk.nashorn.internal.runtime.JSONFunctions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.socket.server.standard.SpringConfigurator;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import java.io.IOException;
import java.util.*;

@ServerEndpoint(value="/websocket/{userId}",configurator = SpringConfigurator.class)
public class WebSocketDemo {
    /** msgType值 **/
    private static final Integer MSG_PUBLIC_CHAT = 0x0001;
    private static final Integer MSG_PRIVATE_CHAT = 2;
    private static final Integer MSG_INVATE = 0x0003;

    /** 日志 **/
    private Logger logger = LoggerFactory.getLogger(WebSocketDemo.class);
    /** 记录登录用户数 **/
    private static int onlineCount = 0;

    /** 记录连接 **/
    private static Map<Integer, Set<WebSocketDemo>> userSocket = new HashMap<>();

    /** 用户session **/
    private Session session;

    /** 用户ID **/
    private Integer userId;

    /** 服务 **/
    @Autowired
    private ChatRoomService chatRoomService;

    /**
     * onOpen
     * 连接执行时
     */
    @OnOpen
    public void onOpen(@PathParam("userId") Integer userId, Session session) throws IOException{
        this.session = session;
        this.userId = userId;
        onlineCount++;

        //判断是否在别的终端登录
        if(userSocket.containsKey(this.userId)){
            logger.info("用户id：{}已在其他终端登录",this.userId);
            System.out.println("用户登录");
            userSocket.get(this.userId).add(this);
        }else{
            logger.info("用户ID:{}登录",this.userId);
            Set<WebSocketDemo> newWSSet = new HashSet<WebSocketDemo>();
            newWSSet.add(this);
            userSocket.put(this.userId,newWSSet);
        }
        logger.info("用户{}登录的终端个数为{}",userId,userSocket.get(userId).size());
        logger.info("当前在线用户数为：{},所有终端数为：{}",userSocket.size(),onlineCount);
    }

    /**
     * onClose
     * 关闭连接时
     */
    @OnClose
    public void onClose(){
        if(userSocket.containsKey(userId)){
            userSocket.get(this.userId).remove(this);
        }
        if(userSocket.get(this.userId).size() == 0){
            userSocket.remove(this.userId);
        }
        logger.info("用户{}登录的终端个数为{}",userId,userSocket.get(userId).size());
        logger.info("当前在线用户数为：{},所有终端数为：{}",userSocket.size(),onlineCount);
    }

    /**
     * onMessage
     * 接收到消息后
     */
    @OnMessage
    public void onMessage(String message, Session session){
        logger.info("收到来自用户id为：{}的消息：{}",this.userId,message);
        if(session ==null)  logger.info("session null");

        ObjectMapper mapper = new ObjectMapper();
        try {
            Message msg = mapper.readValue(message, Message.class);
            handleMessage(msg);
        }catch (IOException e) {
            e.printStackTrace();
        }

    }

    /**
     * onError
     * 连接发生错误
     */
    @OnError
    public void onError(Session session, Throwable error){
        logger.info("用户id为：{}的连接发送错误",this.userId);
        error.printStackTrace();
        if(userSocket.containsKey(userId)){
            userSocket.get(this.userId).remove(this);
        }
        if(userSocket.get(this.userId).size() == 0){
            userSocket.remove(this.userId);
        }

    }

    /**
     *测试连接
     */
    public void getOnlineUser(){
        logger.info("当前在线用户数为：{},所有终端数为：{}",userSocket.size(),onlineCount);
    }

    /**
     * handleMessage
     * 处理信息
     */
    public boolean handleMessage(Message msg){
        if(msg.getMsgType() == MSG_PRIVATE_CHAT){
            return sendPeerMessage(msg);
        }
        if(msg.getMsgType() == MSG_PUBLIC_CHAT){
            return sendGroupMessage(msg);
        }
        return false;

    }
    /**
     * sendto
     * 发送给某人某信息
     */
    public boolean sendto(Integer to, String content){
        logger.info("给用户{}发送消息：{}",to,content);
        for (WebSocketDemo ws: userSocket.get(to)){

            try{
                //跳过自己这条连接

                if(ws.session != this.session){
                    ws.session.getBasicRemote().sendText(content);
                }

            }catch(IOException e){
                e.printStackTrace();
                logger.error("发送信息失败");
                return false;
            }
        }
        return true;
    }

    /**
     * sendPeerMessage
     * 发送私聊消息
     */
    public boolean sendPeerMessage(Message msg){
        logger.info("用户{}给用户{}发送消息：{}",msg.getFromUserId(),msg.getToId(),msg.getContent());
        return sendto(msg.getToId(),msg.getJson());
    }

    /**
     * seedGroupMessage
     * 发送群聊信息
     */
    public boolean sendGroupMessage(Message msg){
        logger.info("用户{}给群组{}发送信息：{}",msg.getFromUserId(),msg.getToId(),msg.getContent());
        ArrayList<Integer> userIdList = chatRoomService.getGroupMembers(msg.getToId());
        for (Integer id: userIdList){
            if(userSocket.containsKey(id)){
                sendto(id,msg.getJson());
            }else{
                logger.info("用户{}不在线",id);
            }


        }
        return true;
    }

}
