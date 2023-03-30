//package learn.collectMe.data;
//
//import learn.collectMe.models.User;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//public interface UserRepository {
//
//    List<User> findAll();
//
//    User findById(int userId);
//
//    @Transactional
//    User findByUsername(String username);
//
//    @Transactional
//    User createCredentials(User user);
//
//    User add(User user);
//
//    @Transactional
//    boolean update(User user);
//
//    boolean deleteById(int userId);
//}
