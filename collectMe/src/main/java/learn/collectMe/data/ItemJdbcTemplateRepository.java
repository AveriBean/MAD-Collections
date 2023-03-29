package learn.collectMe.data;

import learn.collectMe.data.mappers.ActionMapper;
import learn.collectMe.data.mappers.CategoryMapper;
import learn.collectMe.data.mappers.ItemMapper;
import learn.collectMe.models.Category;
import learn.collectMe.models.Item;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import learn.collectMe.models.Action;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ItemJdbcTemplateRepository implements ItemRepository {

    private final JdbcTemplate jdbcTemplate;

    public ItemJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public List<Item> findAll() {
        final String sql = "select item_id, `name`, description, value, user_id "
                + "from item limit 1000;";
        List<Item> items = jdbcTemplate.query(sql, new ItemMapper());
        for (Item i : items) {
            addActions(i);
            addCategories(i);
        }
        return items;
    }

    @Override
    @Transactional
    public Item findById(int itemId) {
        final String sql = "select item_id, `name`, description, value, user_id "
                + "from item "
                + "where item_id = ?;";

        Item i = jdbcTemplate.query(sql, new ItemMapper(), itemId).stream()
                .findFirst().orElse(null);
        if (i != null) {
            addActions(i);
            addCategories(i);
        }
        return i;
    }

    @Override
    @Transactional
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

        Item i = jdbcTemplate.query(sql, new ItemMapper(), item.getItemId()).stream()
                .findFirst().orElse(null);
        if (i != null) {
            addActions(i);
        }

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
    @Transactional
    public boolean deleteById(int itemId) {
        jdbcTemplate.update("delete from category_item where item_id = ?;", itemId);
        jdbcTemplate.update("delete from item_action where item_id = ?;", itemId);
        return jdbcTemplate.update(
                "delete from item where item_id = ?", itemId) > 0;
    }

    private void addActions(Item item) {
        String sql = "select a.status, a.action_id from action a " +
                "inner join item_action ia on a.action_id = ia.action_id " +
                "inner join item i on i.item_id = ia.item_id where i.item_id = ?";
        List<Action> actions = jdbcTemplate.query(sql, new ActionMapper(), item.getItemId());
        item.setActions(actions);


    }

    private void addCategories(Item item) {
        String sql = "select\n" +
                "c.name,\n" +
                "c.category_id \n" +
                "from category c\n" +
                "inner join category_item ci on c.category_id = ci.category_id\n" +
                "inner join item i on ci.item_id = i.item_id\n" +
                "where i.item_id = ?";
        List<Category> categories = jdbcTemplate.query(sql, new CategoryMapper(), item.getItemId());
        item.setCategories(categories);
    }
}
