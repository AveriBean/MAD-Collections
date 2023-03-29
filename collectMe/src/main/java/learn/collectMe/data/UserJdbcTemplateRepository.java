package learn.collectMe.data;

import learn.collectMe.data.mappers.ItemMapper;
import learn.collectMe.data.mappers.UserMapper;
import learn.collectMe.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;
import java.util.List;

public class UserJdbcTemplateRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = "select user_id, first_name, last_name, location, username, password_hash, phone, email, enabled  order by last_name;";

        return jdbcTemplate.query(sql, new UserMapper(roles));
    }

    @Override
    @Transactional
    public User findById(int userId, String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = "select user_id, first_name, last_name, location, username, password_hash, phone, email, enabled "
                + "where user_id = ?;";

        User user = jdbcTemplate.query(sql, new UserMapper(roles), userId)
                .stream().findFirst().orElse(null);

        if (user != null) {
            addItems(user);
        }

        return user;
    }

    @Override
    @Transactional
    public User findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = "select user_id, first_name, last_name, location, username, password_hash, phone, email, enabled "
                + "from user "
                + "where username = ?;";

        return jdbcTemplate.query(sql, new UserMapper(roles), username)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public User createCredentials(User user) {
        final String sql = "insert into user (username, password_hash) values (?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());

        updateRoles(user);

        return user;
    }

    @Override
    public User add(User user) {
        final String sql = "insert into user (first_name, last_name, location, phone, email, enabled) "
                + " values (?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getFirstName());
            ps.setString(2, user.getLastName());
            ps.setString(3, user.getLocation());
            ps.setString(4, user.getPhone());
            ps.setString(5, user.getEmail());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());
        return user;
    }

    @Override
    @Transactional
    public boolean update(User user) {
        final String sql = "update user set "
                + "username = ?, "
                + "enabled = ? "
                + "where user_id = ?";

        boolean updated = jdbcTemplate.update(sql,
                user.getUsername(), user.isEnabled(), user.getUserId()) > 0;

        if (updated) {
            updateRoles(user);
        }

        return updated;
    }

    @Override
    public boolean deleteById(int userId) {
        final String sql = "delete from user where user_id = ?";
        return jdbcTemplate.update(sql, userId) > 0;
    }

    private void addItems(User user) {

        String sql = "select item_id, `name`, description, user_id " +
                "from item where user_id = ?;";

        var userItems = jdbcTemplate.query(sql, new ItemMapper(), user.getUserId());
        user.setItems(userItems);
    }

    private void updateRoles(User user) {
        jdbcTemplate.update("delete from user_role where user_id = ?;", user.getUserId());

        Collection<GrantedAuthority> authorities = user.getAuthorities();

        if (authorities == null) {
            return;
        }

        for (GrantedAuthority role : authorities) {
            String sql = "insert into user_role (user_id, role_id) "
                    + "select ?, role_id from role where `name` = ?;";
            jdbcTemplate.update(sql, user.getUserId(), role.getAuthority());
        }
    }

    private List<String> getRolesByUsername(String username) {
        final String sql = "select r.name "
                + "from user_role ur "
                + "inner join role r on ur.role_id = r.role_id "
                + "inner join user u on ur.user_id = u.user_id "
                + "where u.username = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), username);
    }
}
