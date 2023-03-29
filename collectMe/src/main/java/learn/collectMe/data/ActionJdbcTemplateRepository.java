package learn.collectMe.data;

import learn.collectMe.data.mappers.ActionMapper;
import learn.collectMe.models.Action;
import learn.collectMe.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import javax.swing.*;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

public class ActionJdbcTemplateRepository implements ActionRepository {

    private final JdbcTemplate jdbcTemplate;

    public ActionJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Action> findAll() {
        final String sql = "select action_id, `status` from action;";
        return jdbcTemplate.query(sql, new ActionMapper());
    }

    @Override
    public List<Action> findByItem(Item item) {
        final String sql = "select\n" +
                "\tia.item_id,\n" +
                "    a.`status`\n" +
                "from item_action ia\n" +
                "inner join item i on ia.item_id = i.item_id\n" +
                "inner join `action` a on ia.action_id = a.action_id\n" +
                "where i.item_id = ?;";
        return jdbcTemplate.query(sql, new ActionMapper(), item.getItemId());
    }

    @Override
    public Action findById(int actionId) {
        final String sql = "select action_id, `status` from action where action_id = ?";
        return jdbcTemplate.query(sql, new ActionMapper(), actionId)
                .stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Action add(Action action) {
        final String sql = "insert into action (status) values (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, action.getStatus());
            return statement;
        }, keyHolder);

        if (rowsAffected > 0) {
            action.setActionId(keyHolder.getKey().intValue());
            return action;
        }

        return null;

    }

    @Override
    public boolean update(Action action) {
        final String sql = "update action set status = ? where action_id = ?;";

        return jdbcTemplate.update(sql, action.getStatus(), action.getActionId()) > 0;
    }

    @Override
    public boolean deleteById(int actionId) {
        final String sql = "delete from action where action_id = ?;";

        return jdbcTemplate.update(sql, actionId) > 0;
    }
}
