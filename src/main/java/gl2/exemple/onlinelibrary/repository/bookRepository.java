package gl2.exemple.onlinelibrary.repository;

import gl2.exemple.onlinelibrary.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface bookRepository extends JpaRepository<Book,Integer> {
    //Même si tu cherches par le nom de l'auteur, ce que
    // tu veux obtenir en retour (le résultat final),
    // c'est une liste de livres (List<Book>). En Spring Data
    // JPA, on met la méthode dans le repository
    // correspondant au type de l'objet retourné.
    List<Book> findByTitle(String name);
    List<Book> findByAuthorNameContainingIgnoreCase(String name);//il utilise like
    // et ignore les maj et minus
    // il fait la jointure tous seul

}
