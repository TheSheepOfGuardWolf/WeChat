package example.controller;

import example.pojo.Message;
import example.service.MessageService;
import example.serviceImpl.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("message")
public class MessageController {

    @Autowired(required = false)
    private WebSocketService webSocketService;

//    @RequestMapping(value="/message",method= RequestMethod.POST)
//    @ResponseBody
//    public String postMessage(@RequestBody Message msg){
//        System.out.println(msg.toString());
////        messageService.postMessage(msg);
//        String json = "success";
//        return json;
//    }

//    public String postMessage( @RequestParam("msgType") Integer msgType,
//                               @RequestParam("content") String content,
//                               @RequestParam("fromUserId") Integer fromUserId,
//                               @RequestParam("toId") Integer toId,
//                               @RequestParam("timeStamp") String timeStamp){
//        Message msg = new Message(msgType, content,fromUserId,toId,timeStamp);
//        System.out.println(msg.toString());
//        messageService.postMessage(msg);
//        return "receive success";
//    }

    /**
     * 请求连接
     */
    @RequestMapping(value="/websocket",method=RequestMethod.GET)
    @ResponseBody
    public String bind(@RequestParam(value="userId",required=true) Long userId,
                       @RequestParam(value="message",required=true) String message){
//        logger.debug("收到发送请求，向用户{}的消息：{}",userId,message);
        Message msg = new Message(0,"hello",1,0,"1101");
        if(webSocketService.handleMessage(msg)){
            return "success";
        }else{
            return "faile";
        }
    }
}
