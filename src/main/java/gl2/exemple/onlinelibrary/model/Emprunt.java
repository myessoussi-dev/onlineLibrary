package gl2.exemple.onlinelibrary.model;

import jakarta.persistence.*;

@Entity
public class Emprunt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String date;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

}
