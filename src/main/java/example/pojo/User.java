package example.pojo;

public class User {
    private Integer id;
    private String name;
    private String passwd;

    public User(Integer id, String name, String passwd){
        this.id = id;
        this.name = name;
        this.passwd = passwd;
    }

    public User(String name, String passwd){
        this.name = name;
        this.passwd = passwd;
    }


    public User(){
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString(){
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", passwd='" + passwd + '\'' +
                '}';
    }
}
