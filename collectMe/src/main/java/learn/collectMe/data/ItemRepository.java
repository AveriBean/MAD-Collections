package learn.collectMe.data;

import learn.collectMe.models.Item;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ItemRepository {

    @Transactional
    List<Item> findAll();

    @Transactional
    List<Item> findByCategoryId(int categoryId);

    @Transactional
    Item findById(int itemId);

    @Transactional
    Item add(Item item);

    @Transactional
    boolean update (Item item);

    @Transactional
    boolean deleteById(int itemId);
    boolean userExists(int userId);
}
