package learn.collectMe.data.mappers;

import learn.collectMe.models.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class UserWithoutRolesMapper implements RowMapper<User>{
    @Override
    public User mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        return new User(
                resultSet.getInt("user_id"),
                resultSet.getString("first_name"),
                resultSet.getString("last_name"),
                resultSet.getString("username"),
                resultSet.getString("location"),
                resultSet.getString("password_hash"),
                resultSet.getString("phone"),
                resultSet.getString("email"),
                resultSet.getBoolean("enabled"),
                List.of());
    }
}
