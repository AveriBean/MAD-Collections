//package learn.collectMe.domain;
//
//import learn.collectMe.data.ItemRepository;
//import learn.collectMe.data.UserRepository;
//import learn.collectMe.models.User;
//import org.springframework.dao.DuplicateKeyException;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Objects;
//
////TODO implement security methods
//
//@Service
//public class UserService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//    private final ItemRepository itemRepository;
//
//
//    public UserService(UserRepository userRepository, ItemRepository itemRepository) {
//        this.userRepository = userRepository;
//        this.itemRepository = itemRepository;
//
//    }
//
//    public List<User> findAll() {
//        return userRepository.findAll();
//    }
//
//    public User findById(int userId) {
//        return userRepository.findById(userId);
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsername(username);
//
//        if (user == null || !user.isEnabled()) {
//            throw new UsernameNotFoundException(username + " not found");
//        }
//
//        return user;
//    }
//
//    public Result<User> add(User user) {
//        Result<User> result = validate(user);
//        if (!result.isSuccess()) {
//            return result;
//        }
//
//        user =  userRepository.add(user);
//        if (user == null) {
//            result.addMessage("could not save user", ResultType.INVALID);
//            return result;
//        }
//
//        result.setPayload(user);
//        return result;
//    }
//
////    public Result<User> create(String username, String password) {
////        Result<User> result = validate(username, password);
////        if (!result.isSuccess()) {
////            return result;
////        }
////
////        password = encoder.encode(password);
////
////        User appUser = new User(0, username, password, true, List.of("USER"));
////
////        try {
////            appUser = repository.create(appUser);
////            result.setPayload(appUser);
////        } catch (DuplicateKeyException e) {
////            result.addMessage(ActionStatus.INVALID, "The provided username already exists");
////        }
////
////        return result;
////    }
//
//    public Result<User> update(User user) {
//        Result<User> result = validate(user);
//        if (!result.isSuccess()) {
//            return result;
//        }
//        boolean success = userRepository.update(user);
//        if(!success) {
//            result.addMessage("user id " + user.getUserId() + " not found", ResultType.NOT_FOUND);
//        }
//        return result;
//    }
//
////    public Result<Void> deleteById(int userId) {
////        Result<Void> result = new Result<>();
////        boolean userExists = itemRepository.userExists(userId);
////        if (userExists) {
////            result.addMessage("user id is referenced by an item and can't be deleted", ResultType.INVALID);
////            return result;
////        }
////        boolean success = userRepository.deleteById(userId);
////        if(!success) {
////            result.addMessage("user id " + userId + " not found", ResultType.NOT_FOUND);
////        }
////        return result;
////    }
//
//    private Result<User> validate(User user) {
//        Result<User> result = new Result<>();
//        if (user == null) {
//            result.addMessage("user cannot be null", ResultType.INVALID);
//            return result;
//        }
//
//        if ((Validations.isNullOrBlank(user.getFirstName())) || (Validations.isNullOrBlank(user.getLastName()))) {
//            result.addMessage("name fields are required", ResultType.INVALID);
//        }
//
//        if (Validations.isNullOrBlank(user.getEmail())) {
//            result.addMessage("email is required", ResultType.INVALID);
//        }
//
//        return result;
//    }
//
//    private Result<User> validate(String username, String password) {
//        Result<User> result = new Result<>();
//
//        if (username == null || username.isBlank()) {
//            result.addMessage("username is required", ResultType.INVALID);
//            return result;
//        }
//
//        if (password == null) {
//            result.addMessage("password is required", ResultType.INVALID);
//            return result;
//        }
//
//        if (username.length() > 50) {
//            result.addMessage("username must be less than 50 characters", ResultType.INVALID);
//        }
//
//        if (!isValidPassword(password)) {
//            result.addMessage("password must be at least 8 character and contain a digit," +
//                    " a letter", ResultType.INVALID);
//        }
//
//        List<User> users = userRepository.findAll();
//        for(User u: users) {
//            if(Objects.equals(username, u.getUsername())) {
//                result.addMessage("username cannot be duplicated", ResultType.INVALID);
//            }
//        }
//
//        return result;
//    }
//
//    private boolean isValidPassword(String password) {
//        if (password.length() < 8) {
//            return false;
//        }
//
//        int digits = 0;
//        int letters = 0;
//        for (char c : password.toCharArray()) {
//            if (Character.isDigit(c)) {
//                digits++;
//            } else if (Character.isLetter(c)) {
//                letters++;
//            }
//        }
//
//        return digits > 0 && letters > 0;
//    }
//}
