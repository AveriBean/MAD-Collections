package learn.collectMe.data;

import learn.collectMe.data.mappers.ActionMapper;
import learn.collectMe.data.mappers.CategoryMapper;
import learn.collectMe.data.mappers.ItemMapper;
import learn.collectMe.models.Category;
import learn.collectMe.models.Item;

import org.springframework.dao.DataIntegrityViolationException;


import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import learn.collectMe.models.Action;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

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
        final String sql = "select item_id, `name`, description, value, user_id, image "
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
        final String sql = "select item_id, `name`, description, value, user_id, image "
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
        final String sql = "insert into item (`name`, description, value, user_id, image)"
                + "values (?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, item.getItemName());
            ps.setString(2, item.getDescription());
            ps.setBigDecimal(3, item.getValue());
            ps.setInt(4, item.getUserId());
            ps.setString(5, item.getImage());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        item.setItemId(keyHolder.getKey().intValue());
        handleBridgeTables(item);


        return item;
    }


    @Override
    @Transactional(rollbackFor = { DataIntegrityViolationException.class})
    public boolean update(Item item) throws DataIntegrityViolationException {
        final String sql = "update item set "
                + "name = ?, "
                + "description = ?, "
                + "value = ?, "
                + "image = ? "
                + "where item_id = ?;";


        jdbcTemplate.update("delete from item_action where item_id = ?", item.getItemId());
        jdbcTemplate.update("delete from category_item where item_id = ?", item.getItemId());

       try {
           handleBridgeTables(item);
       } catch (DataIntegrityViolationException ex) {
           TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
           return false;
       }

        return jdbcTemplate.update(sql,
                item.getItemName(),
                item.getDescription(),
                item.getValue(),
                item.getImage(),
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

    @Override
    public boolean userExists(int userId) {
        int count = jdbcTemplate.queryForObject(
                "select count(*) from item where user_id = ?;", Integer.class, userId);
        return count > 0;
    }

    private void addActions(Item item) {
        String sql = "select a.status, a.action_id from action a " +
                "inner join item_action ia on a.action_id = ia.action_id " +
                "inner join item i on i.item_id = ia.item_id where i.item_id = ?";
        List<Action> actions = jdbcTemplate.query(sql, new ActionMapper(), item.getItemId());
        item.setActions(actions);


    }

    private void addCategories(Item item) {
        String sql = "select " +
                "c.name, " +
                "c.category_id  " +
                "from category c " +
                "inner join category_item ci on c.category_id = ci.category_id " +
                "inner join item i on ci.item_id = i.item_id " +
                "where i.item_id = ?";
        List<Category> categories = jdbcTemplate.query(sql, new CategoryMapper(), item.getItemId());
        item.setCategories(categories);
    }

    private void handleBridgeTables(Item item) {

        for (Action a : item.getActions()) {
            final String sqlTwo = "insert into item_action (item_id, action_id) values (?,?);";
            jdbcTemplate.update(sqlTwo, item.getItemId(), a.getActionId());
        }

        for (Category c : item.getCategories()) {
            final String sqlThree = "insert into category_item (item_id, category_id) values (?,?);";
            jdbcTemplate.update(sqlThree, item.getItemId(), c.getCategoryId());
        }


    }
}
