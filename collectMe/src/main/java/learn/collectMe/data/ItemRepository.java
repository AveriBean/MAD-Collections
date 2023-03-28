package learn.collectMe.data;

import learn.collectMe.models.Item;

import java.util.List;

public interface ItemRepository {

    List<Item> findAll();
    Item findById(int itemId);
    Item add(Item item);
    boolean update (Item item);
    boolean deleteById(int itemId);

}