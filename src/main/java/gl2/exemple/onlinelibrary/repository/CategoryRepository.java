package gl2.exemple.onlinelibrary.repository;

import gl2.exemple.onlinelibrary.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer> {

    Category findByName(String name);
}
