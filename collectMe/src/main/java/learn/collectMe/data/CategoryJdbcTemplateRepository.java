package learn.collectMe.data;

import learn.collectMe.data.mappers.CategoryMapper;
import learn.collectMe.data.mappers.ItemMapper;
import learn.collectMe.models.Category;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class CategoryJdbcTemplateRepository implements CategoryRepository {

    private final JdbcTemplate jdbcTemplate;

    public CategoryJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Category> findAll() {

        final String sql = "select category_id, `name` from category limit 1000;";
        return jdbcTemplate.query(sql, new CategoryMapper());
    }

    @Override
    @Transactional
    public Category findById(int categoryId) {

        final String sql = "select category_id, `name` from category where category_id = ?;";

        Category result = jdbcTemplate.query(sql, new CategoryMapper(), categoryId).stream()
                .findAny().orElse(null);

        if (result != null) {
            addItems(result);
        }

        return result;
    }

    private void addItems (Category category) {
        final String sql = "select...";

        var items = jdbcTemplate.query(sql, new ItemMapper(), category.getCategoryId());

        category.setItems(items);
    }
}
