package gl2.exemple.onlinelibrary.repository;

import gl2.exemple.onlinelibrary.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author,Integer> {
    Author findByName(String name);
}
