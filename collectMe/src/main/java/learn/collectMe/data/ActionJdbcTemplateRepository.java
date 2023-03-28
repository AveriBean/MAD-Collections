package learn.collectMe.data;

import learn.collectMe.data.mappers.ActionMapper;
import learn.collectMe.models.Action;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ActionJdbcTemplateRepository implements ActionRepository {

    private final JdbcTemplate jdbcTemplate;

    public ActionJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public Action add(Action action) {
        return null;
    }

    @Override
    public boolean update(Action action) {
        return false;
    }

    @Override
    public boolean deleteById(int actionId) {
        return false;
    }
}
