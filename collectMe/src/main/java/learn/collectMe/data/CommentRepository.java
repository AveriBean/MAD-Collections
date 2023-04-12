package learn.collectMe.data;

import learn.collectMe.models.Comment;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CommentRepository {
    @Transactional
    List<Comment> findAll();

    @Transactional
    Comment findById(int commentId);

    @Transactional
    Comment add(Comment comment);

    @Transactional
    boolean update(Comment comment);

    @Transactional
    boolean deleteById(int commentId);
}
