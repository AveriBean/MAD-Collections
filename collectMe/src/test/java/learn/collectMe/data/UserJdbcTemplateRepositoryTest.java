package learn.collectMe.data;

import learn.collectMe.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserJdbcTemplateRepositoryTest {

    @Autowired
    UserJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllUsers() {
        List<User> users = repository.findAll();
        assertNotNull(users);
        assertTrue(users.size() > 0);
    }

    @Test
    void shouldFindById() {
        List<String> roles1 = repository.getRolesByUsername("JMich");
        List<String> roles2 = repository.getRolesByUsername("SWalk");

        User Jackson = new User(1, "JMich", "Micahael", "Jackson", "2720 Rogers Ave", "$2a$04$fsGhcT.hzvC1kKWIxinY3.ILDY44jfgVVQuy7ALwx7BSphI0B3mLa", "(205) 402-9977", "mj@email.com", true, roles1 );
        User Walker = new User(2, "SWalk", "Sally", "Walker", "16547 Baisley Blvd", "$2a$04$fsGhcT.hzvC1kKWIxinY3.ILDY44jfgVVQuy7ALwx7BSphI0B3mLa", "(703) 528-7303", "sw@email.com", true, roles2 );
        User actual = repository.findById(1);
        assertEquals(Jackson, actual);

        actual = repository.findById(2);
        assertEquals(Walker, actual);

        actual = repository.findById(100);
        assertNull(actual);
    }

    @Test
    void shouldAdd() {
        List<String> roles = repository.getRolesByUsername("Test Username");

        User arg = new User(0, "Test Username", "Test", "Test", "Test", "Test", "Test", "Test", true, roles);
        User expected = new User(5, "Test Username", "Test", "Test", "Test", "Test", "Test", "Test", true, roles);
        User actual = repository.add(arg);
        assertEquals(expected, actual);
    }

    @Test
    void shouldUpdateExisting() {
        User arg = new User(2, "Test", "Walker", "Sally's Address", "2622622626", "sw@testing.com");
        boolean actual = repository.update(arg);
        assertTrue(actual);
    }

    @Test
    void shouldNotUpdateMissing() {
        User arg = new User(100, "Test", "Walker", "Sally's Address", "2622622626", "sw@testing.com");
        boolean actual = repository.update(arg);
        assertFalse(actual);
    }

    @Test
    void shouldDeleteExisting() {
        boolean actual = repository.deleteById(4);
        assertTrue(actual);
    }

    @Test
    void shouldNotDeleteMissing() {
        boolean actual = repository.deleteById(100);
        assertFalse(actual);
    }

    @Test
    void shouldNotDeleteUserWithItems() {
        boolean actual = repository.deleteById(1);
        assertFalse(actual);
    }







}