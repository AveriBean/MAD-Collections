package learn.collectMe.data;

import learn.collectMe.models.Category;

import java.util.List;

public interface CategoryRepository {

    List<Category> findAll();

    Category findById(int categoryId);
}
