package learn.collectMe.data;

import learn.collectMe.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ItemJdbcTemplateRepository implements ItemRepository{

    private final JdbcTemplate jdbcTemplate;

    public ItemJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Item> findAll() {
        final String sql = "select item_id, `name`, description, value, user_id "
                + "from item limit 1000;";
        return jdbcTemplate.query(sql, new ItemMapper());
    }

    @Override
    public Item findById(int itemId) {
        return null;
    }

    @Override
    public Item add(Item item) {
        return null;
    }

    @Override
    public boolean update(Item item) {
        return false;
    }

    @Override
    public boolean deleteById(int itemId) {
        return false;
    }
}
