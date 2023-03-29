package learn.collectMe.data;

import learn.collectMe.models.Action;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

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
    void shouldFindAllActions() {
        List<Action> actions = repository.findAll();

        assertNotNull(actions);
        assertTrue(actions.size() == 4);
    }

    @Test
    void shouldFindActionByItem() {
    }

    @Test
    void shouldFindActionById() {
    }
}