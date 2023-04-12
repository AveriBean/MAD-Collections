package learn.collectMe.data;

import learn.collectMe.data.mappers.CommentMapper;
import learn.collectMe.data.mappers.ItemMapper;
import learn.collectMe.models.Comment;
import learn.collectMe.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

public class CommentJdbcTemplateRepository implements CommentRepository {
    private final JdbcTemplate jdbcTemplate;


    public CommentJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public List<Comment> findAll() {

            final String sql = "select comment_id, user_id, item_id, content "
                    + "from comment limit 1000;";
            List<Comment> comments = jdbcTemplate.query(sql, new CommentMapper());
            return comments;
    }

    @Override
    @Transactional
    public Comment findById(int commentId) {
        final String sql = "select user_id, item_id, content "
                + "from comment where comment_id = ?";
        Comment comment = jdbcTemplate.query(sql, new CommentMapper(), commentId).stream()
                .findFirst()
                .orElse(null);
        return comment;
    }

    @Override
    @Transactional
    public Comment add(Comment comment) {
        String sql = "insert into comment (user_id, item_id, content) values (?,?,?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update((conn) -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, comment.getUserId());
            statement.setInt(2, comment.getItemId());
            statement.setString(3, comment.getContent());
            return statement;
        }, keyHolder);
        if (rowsAffected>0){
            comment.setCommentId(keyHolder.getKey().intValue());
            return comment;
    }
        return null;
    }

    @Override
    @Transactional
    public boolean update(Comment comment) {
        String sql = "update comment set user_id = ?, item_id = ?, content = ?;";

        int rowsAffected = jdbcTemplate.update(sql, comment.getUserId(), comment.getItemId(), comment.getContent());

        if (rowsAffected > 0) {
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean deleteById(int commentId) {
        jdbcTemplate.update("delete from comment where comment_id = ?;", commentId);
        return jdbcTemplate.update("delete from comment where comment_id = ?;", commentId) > 0;

}

    }
