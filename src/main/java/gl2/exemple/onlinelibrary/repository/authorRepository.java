package gl2.exemple.onlinelibrary.repository;

import gl2.exemple.onlinelibrary.model.Author;
import gl2.exemple.onlinelibrary.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface authorRepository extends JpaRepository<Author,Integer> {
}
