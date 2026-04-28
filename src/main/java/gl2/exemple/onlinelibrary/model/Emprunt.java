package gl2.exemple.onlinelibrary.model;

import jakarta.persistence.*;

@Entity
public class Emprunt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String date;
    private Boolean rendu=false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    //ici on peut faire aussi sans join column
    //jpa va automatiquement joindre avec la PK et propose un nom
    //a cette column par defaut


    public Emprunt(Integer id, String date, Boolean rendu, User user) {
        this.id = id;
        this.date = date;
        this.rendu = rendu;
        this.user = user;
    }
    public Emprunt(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Boolean getRendu() {
        return rendu;
    }

    public void setRendu(Boolean rendu) {
        this.rendu = rendu;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
