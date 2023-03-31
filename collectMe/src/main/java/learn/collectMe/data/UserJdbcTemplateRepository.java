package learn.collectMe.data;

import learn.collectMe.data.mappers.ItemMapper;
import learn.collectMe.data.mappers.UserMapper;
import learn.collectMe.data.mappers.UserWithoutRolesMapper;
import learn.collectMe.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;
import java.util.List;

@Repository
public class UserJdbcTemplateRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll() {

        final String sql = "select user_id, first_name, last_name, location, username, password_hash, phone, email, enabled " +
                "from user " +
                "order by last_name;";

        return jdbcTemplate.query(sql, new UserWithoutRolesMapper());
    }

    @Override
    @Transactional
    public User findById(int userId) {

         final String sql = "select user_id, first_name, last_name, location, username, password_hash, phone, email, enabled " +
                "from user "
                + "where user_id = ?;";

        User user = jdbcTemplate.query(sql, new UserWithoutRolesMapper(), userId)
                .stream().findFirst().orElse(null);

        if (user != null) {
            addItems(user);
            List<String> roles = getRolesByUsername(user.getUsername());
            user.convertRolesToAuthorities(roles);
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
    @Transactional
    public User add(User user) {
        final String sql = "insert into user (username, first_name, last_name, location, password_hash, phone, email, enabled) "
                + " values (?,?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1,user.getUsername());
            ps.setString(2, user.getFirstName());
            ps.setString(3, user.getLastName());
            ps.setString(4, user.getLocation());
            ps.setString(5, user.getPassword());
            ps.setString(6, user.getPhone());
            ps.setString(7, user.getEmail());
            ps.setBoolean(8, user.isEnabled());
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
                + "username = ?, " +
                "first_name = ?, " +
                "last_name = ?, " +
                "location = ?, " +
                "password_hash = ?, " +
                "phone = ?, " +
                "email = ?, " +
                "enabled = ? "
                + "where user_id = ?";

        boolean updated = jdbcTemplate.update(sql,
                user.getUsername(), user.getFirstName(), user.getLastName(), user.getLocation(),
                user.getPassword(), user.getPhone(), user.getEmail(), user.isEnabled(), user.getUserId()) > 0;

        if (updated) {
            updateRoles(user);
        }

        return updated;
    }

    @Override
    public boolean deleteById(int userId) {
        int commentCount = jdbcTemplate.queryForObject(
                "select count(*) from comment where user_id = ?;", Integer.class, userId);
        int itemCount = jdbcTemplate.queryForObject(
                "select count(*) from item where user_id = ?;", Integer.class, userId);

        if ((commentCount > 0) || (itemCount > 0)) {
            return false;
        }

        String sql = "delete from user where user_id = ?";
        return jdbcTemplate.update(sql, userId) > 0;
    }

    private void addItems(User user) {

        String sql = "select item_id, `name`, description, value, user_id, image " +
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
                    + "select ?, role_id from role where role_name = ?;";
            jdbcTemplate.update(sql, user.getUserId(), role.getAuthority());
        }
    }

    public List<String> getRolesByUsername(String username) {
        final String sql = "select r.role_name "
                + "from user_role ur "
                + "inner join role r on ur.role_id = r.role_id "
                + "inner join user u on ur.user_id = u.user_id "
                + "where u.username = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("role_name"), username);
    }
}
