package learn.collectMe.domain;

import learn.collectMe.data.UserJdbcTemplateRepository;
import learn.collectMe.data.UserRepository;
import learn.collectMe.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class UserServiceTest {

    @MockBean
    UserJdbcTemplateRepository userRepository;

    @Autowired
    UserService userService;

    @Test
    void shouldAdd() {
        List<String> roles = userRepository.getRolesByUsername("Test Username");
        User arg = new User(0, "Test Username", "Test", "Test", "Test", "$2a$04$fsGhcT.hzvC1kKWIxinY3.ILDY44jfgVVQuy7ALwx7BSphI0B3mLa", "Test", "Test", true, roles);

        Result<User> expected = new Result<>();
        expected.setPayload(new User(5, "Test Username", "Test", "Test", "Test", "$2a$04$fsGhcT.hzvC1kKWIxinY3.ILDY44jfgVVQuy7ALwx7BSphI0B3mLa", "Test", "Test", true, roles));

        when(userRepository.add(any())).thenReturn(new User(5, "Test Username", "Test", "Test", "Test", "$2a$04$fsGhcT.hzvC1kKWIxinY3.ILDY44jfgVVQuy7ALwx7BSphI0B3mLa", "Test", "Test", true, roles));

        Result<User> actual = userService.add(arg);

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddEmptyName() {
        List<String> roles = userRepository.getRolesByUsername("Test Username");
        User arg = new User(0, "Test Username", "", "", "Test", "$2a$04$fsGhcT.hzvC1kKWIxinY3.ILDY44jfgVVQuy7ALwx7BSphI0B3mLa", "Test", "Test", true, roles);
        Result<User> expected = new Result<>();
        expected.addMessage("name fields are required", ResultType.INVALID);
        Result<User> actual = userService.add(arg);

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddEmptyEmail() {
        List<String> roles = userRepository.getRolesByUsername("Test Username");
        User arg = new User(0, "Test Username", "Test", "Test", "Test", "$2a$04$fsGhcT.hzvC1kKWIxinY3.ILDY44jfgVVQuy7ALwx7BSphI0B3mLa", "Test", "", true, roles);
        Result<User> expected = new Result<>();
        expected.addMessage("email is required", ResultType.INVALID);
        Result<User> actual = userService.add(arg);

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddUserOverFiftyCharacters() {
        List<String> roles = userRepository.getRolesByUsername("Test Username");
        User arg = new User(0, "Test UsernameTest UsernameTest UsernameTest Username", "Test", "Test", "Test", "$2a$04$fsGhcT.hzvC1kKWIxinY3.ILDY44jfgVVQuy7ALwx7BSphI0B3mLa", "Test", "Test", true, roles);
        Result<User> expected = new Result<>();
        expected.addMessage("username must be less than 50 characters", ResultType.INVALID);
        Result<User> actual = userService.add(arg);

        assertEquals(expected, actual);
    }

    @Test
    void shouldUpdate() {
        List<String> roles = userRepository.getRolesByUsername("SWalk");

        User user = new User(2, "Updated Username", "Sally", "Walker", "Sally's Address", "passwordHash2", "2622622626", "sw@testing.com", true, roles);

        when(userRepository.update(user)).thenReturn(true);

        Result<User> actual = userService.update(user);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateEmptyName() {
        List<String> roles = userRepository.getRolesByUsername("SWalk");

        User user = new User(2, "Updated Username", "Sally", "", "Sally's Address", "passwordHash2", "2622622626", "sw@testing.com", true, roles);
        Result<User> expected = new Result<>();
        expected.addMessage("name fields are required", ResultType.INVALID);

        Result<User> actual = userService.update(user);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotUpdateEmptyEmail() {
        List<String> roles = userRepository.getRolesByUsername("SWalk");

        User user = new User(2, "Updated Username", "Sally", "Walker", "Sally's Address", "passwordHash2", "2622622626", "", true, roles);
        Result<User> expected = new Result<>();
        expected.addMessage("email is required", ResultType.INVALID);

        Result<User> actual = userService.update(user);
        assertEquals(expected, actual);
    }
}