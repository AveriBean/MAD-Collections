package learn.collectMe.data.mappers;

import learn.collectMe.models.Comment;
import learn.collectMe.models.Item;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CommentMapper implements RowMapper<Comment> {

    @Override
    public Comment mapRow(ResultSet resultSet, int i) throws SQLException {
        Comment comment = new Comment();

        comment.setCommentId(resultSet.getInt("comment_id"));
        comment.setUserId(resultSet.getInt("user_id"));
        comment.setItemId(resultSet.getInt("item_id"));
        comment.setContent(resultSet.getString("content"));
        return comment;
    }
}
