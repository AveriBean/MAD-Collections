package learn.collectMe.data;

import learn.collectMe.models.Comment;
import learn.collectMe.models.Item;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class CommentJdbcTemplateRepositoryTest {

    @Autowired
    CommentJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    @Test
    void shouldFindAll() {
        List<Comment> comments = repository.findAll();
        assertNotNull(comments);
        assertTrue(comments.size() >= 2 && comments.size() <= 6);

    }


    @Test
    void shouldFindById() {
        Comment comment = repository.findById(2);
        assertNotNull(comment);
    }
}