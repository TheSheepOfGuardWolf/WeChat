package example.pojo;

import java.util.ArrayList;

public class ChatRoom {
    private Integer roomId;
    private String roomName;
    private Integer adminId;
    private Integer memNumber;

    public ChatRoom(Integer adminId,String roomName){
        this.roomName = roomName;
        this.adminId = adminId;
        this.memNumber = 1;
        //一个房间人员上限为1000人
    }
    public ChatRoom(){
        super();
    }

    public Integer getAdminId() {
        return adminId;
    }

    public String getRoomName() {
        return roomName;
    }

    public Integer getMemNumber() {
        return memNumber;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }
}
