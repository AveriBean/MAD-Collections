package learn.collectMe.domain;

import learn.collectMe.data.ActionRepository;
import learn.collectMe.models.Action;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ActionServiceTest {

    @MockBean
    ActionRepository actionRepository;

    @Autowired
    ActionService actionService;

    @Test
    void shouldFindAll() {
        List<Action> expected = new ArrayList<>();
        when(actionRepository.findAll()).thenReturn(expected);

        List<Action> actual = actionService.findAll();
    }
}