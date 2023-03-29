package learn.collectMe.data;

import learn.collectMe.data.mappers.CategoryMapper;
import learn.collectMe.data.mappers.ItemMapper;
import learn.collectMe.models.Category;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
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

    @Override
    public Category add(Category category) {
        final String sql = "insert into category (`name`) values (?);";

        KeyHolder keyholder = new GeneratedKeyHolder();

        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, category.getCategoryName());
            return statement;
        }, keyholder);

        category.setCategoryId((keyholder.getKey().intValue()));
        return category;
    }

    @Override
    public boolean update(Category category) {
        final String sql = "update category set `name` = ? where category_id = ?";

        return jdbcTemplate.update(sql, category.getCategoryName(), category.getCategoryId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int categoryId) {
        int count = jdbcTemplate.queryForObject(
                "select count(*) from category_item where category_id = ?;",
                Integer.class,
                categoryId);

        if(count > 0) {
            return false;
        }

        jdbcTemplate.update("delete from category_item where category_id = ?", categoryId);
        return jdbcTemplate.update("delete from category where category_id = ?", categoryId) > 0;
    }

    private void addItems (Category category) {
        final String sql = "select\n" +
                "\tci.category_id,\n" +
                "    ci.item_id,\n" +
                "    c.`name`,\n" +
                "    i.`name`,\n" +
                "    i.`description`,\n" +
                "    i.`value`,\n" +
                "    i.user_id\n" +
                "from category_item ci\n" +
                "inner join item i on ci.item_id = i.item_id\n" +
                "inner join category c on ci.category_id = c.category_id\n" +
                "where ci.category_id = ?;";

        var items = jdbcTemplate.query(sql, new ItemMapper(), category.getCategoryId());

        category.setItems(items);
    }
}
