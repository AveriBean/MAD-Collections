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
        if(resultSet.getBoolean("viewable") != action.isViewable()) {
            action.setViewable(resultSet.getBoolean("viewable"));
        }
        if(resultSet.getBoolean("tradeable") != action.isTradeable()) {
            action.setTradeable(resultSet.getBoolean("tradeable"));
        }
        if(resultSet.getBoolean("saleable") != action.isSaleable()) {
            action.setSaleable(resultSet.getBoolean("saleable"));
        }
        if(resultSet.getBoolean("negotiable") != action.isNegotiable()) {
            action.setNegotiable(resultSet.getBoolean("negotiable"));
        }
        return action;
    }
}
