package gl2.exemple.onlinelibrary.model;

import jakarta.persistence.*;
// pour les bases de données SQL (comme H2 ou MySQL).
// Elle dit à Hibernate : "Ceci est la clé primaire de ma table".
// org.springframework.data.annotation.Id c pour NoSql

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; //cannot be primitive type int no
    private String imageUrl;
    @Column(unique = true)
    private String title;
    private Boolean available=true;
    @Lob
    private String description;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;
    @ManyToOne // no need to join jpa wil do it by itself and generate
    // autocolumn name
    private Category category;

    public Book() {
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
