package learn.collectMe.data;

import learn.collectMe.models.Action;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ActionJdbcTemplateRepositoryTest {

    @Autowired
    ActionJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldAdd() {
        Action action = new Action();
        action.setStatus(tradeable);

    }

    @Test
    void shouldUpdateExisting() {
    }

    @Test
    void shouldDeleteByIdExisting() {
    }
}