package example.serviceImpl;

import example.pojo.Message;
import example.web.WebSocketDemo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;

@Service("webSocketMessageService")
public class WebSocketService {
    /** 日志 **/
    private Logger logger = LoggerFactory.getLogger(WebSocketService.class);

    /** 获取连接类 **/
    private WebSocketDemo webSocketDemo = new WebSocketDemo();

    /**
     * handleMessage
     * 处理消息
     */
    public Boolean handleMessage(Message msg){
        webSocketDemo.getOnlineUser();
        return true;
    }
}
