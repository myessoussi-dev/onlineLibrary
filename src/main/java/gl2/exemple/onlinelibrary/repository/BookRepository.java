package gl2.exemple.onlinelibrary.repository;

import gl2.exemple.onlinelibrary.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {
    //Même si tu cherches par le nom de l'auteur, ce que
    // tu veux obtenir en retour (le résultat final),
    // c'est une liste de livres (List<Book>). En Spring Data
    // JPA, on met la méthode dans le repository
    // correspondant au type de l'objet retourné.

    @Override
    Optional<Book> findById(Integer integer);
    // Optional ne retourne jamais null.
    // Si la valeur existe → Optional.of(value)
    // Si la valeur n’existe pas → Optional.empty()
    //
    // Pourquoi pas null ?
    // Parce que null peut provoquer des NullPointerException et est ambigu.
    // Optional a été créé pour représenter explicitement l’absence de valeur
    // tout en évitant les erreurs liées à null.
    List<Book> findByTitle(String name);
    List<Book> findByAuthorNameContainingIgnoreCase(String name);//il utilise like
    // et ignore les maj et minus
    // il fait la jointure tous seul

}
