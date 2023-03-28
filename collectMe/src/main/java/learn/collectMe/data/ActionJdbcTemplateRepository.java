package learn.collectMe.data;

import learn.collectMe.models.Action;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ActionJdbcTemplateRepository implements ActionRepository {

    private final JdbcTemplate jdbcTemplate;

    public ActionJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Action> findAll() {
        return null;
    }

    @Override
    public Action findById(int actionId) {
        return null;
    }
}
