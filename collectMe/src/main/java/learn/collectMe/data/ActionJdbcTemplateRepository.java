package learn.collectMe.data;

import learn.collectMe.models.Action;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;

public class ActionJdbcTemplateRepository implements ActionRepository {

    private final JdbcTemplate jdbcTemplate;

    public ActionJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public Action add(Action action) {
        String sql = "insert into action (status) values (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, action.getStatus());
            return null;
        }, keyHolder);

        if (rowsAffected > 0) {
            action.setActionId(keyHolder.getKey().intValue());
            return action;
        }

        return null;

    }

    @Override
    public boolean update(Action action) {
        String sql = "update action set status = ? where action_id = ?;";

        return jdbcTemplate.update(sql, action.getStatus(), action.getActionId()) > 0;
    }

    @Override
    public boolean deleteById(int actionId) {
        String sql = "delete from action where action_id = ?;";

        return jdbcTemplate.update(sql, actionId) > 0;
    }
}
