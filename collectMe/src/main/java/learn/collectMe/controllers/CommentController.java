package learn.collectMe.controllers;

import learn.collectMe.domain.CommentService;
import learn.collectMe.domain.ItemService;
import learn.collectMe.domain.Result;
import learn.collectMe.models.Comment;
import learn.collectMe.models.Item;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService service;

    public CommentController(CommentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Comment> findAll() { return service.findAll(); }


    @GetMapping("/{commentId}")
    public Comment findById(@PathVariable int commentId) {
        return service.findById(commentId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Comment comment) {
        Result<Comment> result = service.add(comment);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Object> update(@PathVariable int commentId, @RequestBody Comment comment) {
        if (commentId != comment.getCommentId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Comment> result = service.update(comment);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.ACCEPTED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteById(@PathVariable int commentId) {
        if (service.deleteById(commentId)) {
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
