package learn.collectMe.domain;

import learn.collectMe.data.CommentJdbcTemplateRepository;
import learn.collectMe.data.CommentRepository;
import learn.collectMe.models.Comment;
import learn.collectMe.models.Item;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CommentService {

    private final CommentRepository repository;

    public CommentService(CommentRepository repository) {
        this.repository = repository;
    }

    public List<Comment> findAll() {return repository.findAll();};


    public Comment findById(int commentId) {return repository.findById(commentId);};

    public Result<Comment> add(Comment comment) {
        Result<Comment> result = validate(comment);
        if (!result.isSuccess()) {
            return result;
        }
        if (comment.getCommentId() !=0) {
            result.addMessage("comment id cannot be set for this operation", ResultType.INVALID);
        }
        comment = repository.add(comment);
        result.setPayload(comment);
        return result;

    }



    public Result<Comment> update(Comment comment) {
        Result<Comment> result = validate(comment);
        if (!result.isSuccess()) {
            return result;
        }

        if (comment.getUserId() <= 0) {
            result.addMessage("user id is required", ResultType.INVALID);
        }

        if (comment.getItemId() <= 0) {
            result.addMessage("item id must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(comment)) {
            String msg = String.format("Comment id: %s, not found", comment.getCommentId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int commentId) {
        return repository.deleteById(commentId);
    }


    private Result<Comment> validate(Comment comment) {
        Result<Comment> result = new Result<>();
        if (comment == null) {
            result.addMessage("comment cannot be null", ResultType.INVALID);
        }
        assert comment != null;
        if (Validations.isNullOrBlank(comment.getContent())) {
            result.addMessage("comment content is required", ResultType.INVALID);
        }

        return result;
    }


}
