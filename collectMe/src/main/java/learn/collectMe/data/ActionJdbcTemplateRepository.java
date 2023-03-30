package learn.collectMe.data;

import learn.collectMe.data.mappers.ActionMapper;
import learn.collectMe.models.Action;
import learn.collectMe.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
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
    public List<Action> findByItem(int itemId) {
        return null;
    }

    @Override
    public Action findById(int actionId) {
        return null;
    }

}
