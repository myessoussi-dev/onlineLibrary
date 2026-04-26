package gl2.exemple.onlinelibrary.model;

import jakarta.persistence.*;

@Entity
public class ligneEmprunt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "emprunt_id")
    private Emprunt emprunt;
    @ManyToOne
    private Book book;

    public ligneEmprunt(Integer id, Emprunt emprunt, Book book) {
        this.id = id;
        this.emprunt = emprunt;
        this.book = book;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Emprunt getEmprunt() {
        return emprunt;
    }

    public void setEmprunt(Emprunt emprunt) {
        this.emprunt = emprunt;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
