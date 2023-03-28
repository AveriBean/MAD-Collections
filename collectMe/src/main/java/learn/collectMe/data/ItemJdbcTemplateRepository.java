package learn.collectMe.data;

import learn.collectMe.data.mappers.ItemMapper;
import learn.collectMe.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;
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
        final String sql = "select item_id, `name`, description, value, user_id "
                + "from item "
                + "where item_id = ?;";

        return jdbcTemplate.query(sql, new ItemMapper(), itemId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Item add(Item item) {
        final String sql = "insert into item (`name`, description, value, user_id)"
                + "values (?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, item.getItemName());
            ps.setString(2, item.getDescription());
            ps.setBigDecimal(3, item.getValue());
            ps.setInt(4, item.getUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        item.setItemId(keyHolder.getKey().intValue());
        return item;
    }

    @Override
    public boolean update(Item item) {
        final String sql = "update item set "
                + "name = ?, "
                + "description = ?, "
                + "value = ? "
                + "where item_id = ?;";

        return jdbcTemplate.update(sql,
                item.getItemName(),
                item.getDescription(),
                item.getValue(),
                item.getItemId()) > 0;
    }

    @Override
    public boolean deleteById(int itemId) {
        return jdbcTemplate.update(
                "delete from item where item_id = ?", itemId) > 0;
    }
}
