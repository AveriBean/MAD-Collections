package learn.collectMe.data.mappers;

import learn.collectMe.models.Action;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ActionMapper implements RowMapper<Action> {


    @Override
    public Action mapRow(ResultSet resultSet, int i) throws SQLException {
        Action action = new Action();
        action.setActionId(resultSet.getInt("action_id"));
        action.setStatus(resultSet.getString("status"));
        return action;
    }
}
