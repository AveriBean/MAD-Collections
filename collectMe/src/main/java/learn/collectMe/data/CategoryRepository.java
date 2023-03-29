package learn.collectMe.data;

import learn.collectMe.models.Category;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CategoryRepository {

    List<Category> findAll();

    @Transactional
    Category findById(int categoryId);

    Category add(Category category);

    boolean update(Category category);

    @Transactional
    boolean deleteById(int categoryId);
}
