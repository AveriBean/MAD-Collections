
package learn.collectMe.domain;

import learn.collectMe.data.ItemJdbcTemplateRepository;
import learn.collectMe.data.UserJdbcTemplateRepository;
import learn.collectMe.models.User;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

//TODO implement security methods

@Service
public class UserService implements UserDetailsService{

    private final UserJdbcTemplateRepository userRepository;
    private final ItemJdbcTemplateRepository itemRepository;
    private final PasswordEncoder encoder;

    public UserService(UserJdbcTemplateRepository userRepository, ItemJdbcTemplateRepository itemRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
        this.encoder = encoder;
    }


    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(int userId) {
        return userRepository.findById(userId);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null || !user.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return user;
    }


    public Result<User> add(User user) {
        Result<User> result = validate(user);
        if (!result.isSuccess()) {
            return result;
        }

        user.setPassword(encoder.encode(user.getPassword()));

        try {
            user = userRepository.add(user);
            if (user == null) {
                result.addMessage("could not save user", ResultType.INVALID);
                return result;
            }
            result.setPayload(user);
        }catch (DuplicateKeyException ex) {
            result.addMessage("The provided username already exists", ResultType.INVALID);
        }
        result.setPayload(user);
        return result;
    }

    public Result<User> update(User user) {
        Result<User> result = validateUpdate(user);
        if (!result.isSuccess()) {
            return result;
        }
        boolean success = userRepository.update(user);
        if(!success) {
            result.addMessage("user id " + user.getUserId() + " not found", ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<Void> deleteById(int userId) {
        Result<Void> result = new Result<>();
        boolean userExists = itemRepository.userExists(userId);
        if (userExists) {
            result.addMessage("user id is referenced by an item and can't be deleted", ResultType.INVALID);
            return result;
        }
        boolean success = userRepository.deleteById(userId);
        if(!success) {
            result.addMessage("user id " + userId + " not found", ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<User> validate(User user) {
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("user cannot be null", ResultType.INVALID);
            return result;
        }

        if ((Validations.isNullOrBlank(user.getFirstName())) || (Validations.isNullOrBlank(user.getLastName()))) {
            result.addMessage("name fields are required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(user.getEmail())) {
            result.addMessage("email is required", ResultType.INVALID);
        }

        if (user.getUsername() == null || user.getUsername().isBlank()) {
            result.addMessage("username is required", ResultType.INVALID);
            return result;
        }

        if (user.getPassword() == null) {
            result.addMessage("password is required", ResultType.INVALID);
            return result;
        }

        if (user.getUsername().length() > 50) {
            result.addMessage("username must be less than 50 characters", ResultType.INVALID);
        }

        if (!isValidPassword(user.getPassword())) {
            result.addMessage("password must be at least 8 characters long and contain both a digit" +
                    " and a letter", ResultType.INVALID);
        }

        return result;
    }

    private Result<User> validateUpdate(User user) {
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("user cannot be null", ResultType.INVALID);
            return result;
        }

        if ((Validations.isNullOrBlank(user.getFirstName())) || (Validations.isNullOrBlank(user.getLastName()))) {
            result.addMessage("name fields are required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(user.getEmail())) {
            result.addMessage("email is required", ResultType.INVALID);
        }

        return result;
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            }
        }

        return digits > 0 && letters > 0;
    }
}
