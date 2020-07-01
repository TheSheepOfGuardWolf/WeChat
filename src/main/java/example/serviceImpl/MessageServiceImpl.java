package example.serviceImpl;

import example.dao.MessageDao;
import example.dao.UserDao;
import example.pojo.Message;
import example.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageDao messageDao;

    @Override
    public void postMessage(Message msg) {
        messageDao.addMessage(msg);
    }
}
