package example.pojo;


import java.io.Serializable;

public class Message implements Serializable {

//    static private Integer MSG_PUBLIC_CHAT = 0x0001;
//    static private Integer MSG_PRIVATE_CHAT = 0x0002;
//    static private Integer MSG_INVATE = 0x0003;

    private Integer msgId;
    private Integer msgType;
    private String content;
    private Integer fromUserId;
    private Integer toId;
    private String timeStamp;

    public Message( Integer msgType, String content, Integer fromUserId, Integer toId, String timeStamp ){
        this.msgType = msgType;
        this.content = content;
        this.fromUserId = fromUserId;
        this.toId = toId;
        this.timeStamp = timeStamp;
    }
    public Message(){
        super();
    }

    public Integer getMsgId() {
        return msgId;
    }

    public void setMsgId(Integer msgId) {
        this.msgId = msgId;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    public void setFromUserId(Integer fromUserId) {
        this.fromUserId = fromUserId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setMsgType(Integer msgType) {
        this.msgType = msgType;
    }

    public void setToId(Integer toId) {
        this.toId = toId;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public Integer getFromUserId() {
        return fromUserId;
    }

    public Integer getMsgType() {
        return msgType;
    }

    public Integer getToId() {
        return toId;
    }

    public String getContent() {
        return content;
    }
    @Override
    public String toString() {
        return "Message{" +
                "msgId=" + msgId +
                ", msgType=" + msgType +
                ", content='" + content + '\'' +
                ", fromUserId=" + fromUserId  +
                ", toId=" + toId  +
                ", timeStamp='" + timeStamp + '\'' +
                '}';
    }

    public String getJson(){
        return  '{'+
                "\"msgType\": \"" + msgType +'\"' +
                ", \"content\": \"" + content + '\"' +
                ", \"fromUserId\": \"" + fromUserId  + '\"'+
                ", \"toId\": \"" + toId  +'\"' +
                ", \"timeStamp\": \"" + timeStamp + '\"' +
                '}';
    }
}
