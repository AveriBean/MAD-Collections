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

}
