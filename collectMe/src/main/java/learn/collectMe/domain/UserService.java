package learn.collectMe.domain;

import learn.collectMe.data.ItemRepository;
import learn.collectMe.data.UserRepository;
import learn.collectMe.models.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

//TODO check if items exists before deleting user
//TODO implement security methods

@Service
public class UserService {

    private final UserRepository userRepository;


    public UserService(UserRepository userRepository, ItemRepository itemRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(int userId) {
        return userRepository.findById(userId);
    }

    public Result<User> add(User user) {
        Result<User> result = validate(user);
        if (!result.isSuccess()) {
            return result;
        }

        user =  userRepository.add(user);
        if (user == null) {
            result.addMessage("could not save user", ResultType.INVALID);
            return result;
        }

        result.setPayload(user);
        return result;
    }

    public Result<User> update(User user) {
        Result<User> result = validate(user);
        if (!result.isSuccess()) {
            return result;
        }
        boolean success = userRepository.update(user);
        if(!success) {
            result.addMessage("user id " + user.getUserId() + " not found", ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteById(int userId) {
        return userRepository.deleteById(userId);
    }

    private Result<User> validate(User user) {
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("user cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(user.getUsername())) {
            result.addMessage("username is required", ResultType.INVALID);
        }

        if ((Validations.isNullOrBlank(user.getFirstName())) || (Validations.isNullOrBlank(user.getLastName()))) {
            result.addMessage("name fields are required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(user.getPassword())) {
            result.addMessage("password is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(user.getEmail())) {
            result.addMessage("email is required", ResultType.INVALID);
        }

        if (user.getUsername().length() > 50) {
            result.addMessage("username must be less than 50 characters", ResultType.INVALID);
        }

        if (!isValidPassword(user.getPassword())) {
            result.addMessage("password must be at least 8 character and contain a digit," +
                            " a letter", ResultType.INVALID);
        }

        List<User> users = userRepository.findAll();
        for(User u: users) {
            if(Objects.equals(user.getUsername(), u.getUsername())) {
                result.addMessage("username cannot be duplicated", ResultType.INVALID);
            }
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
