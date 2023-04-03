package learn.collectMe.domain;

import learn.collectMe.data.CategoryRepository;
import learn.collectMe.data.ItemRepository;
import learn.collectMe.models.Category;
import learn.collectMe.models.Item;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {
    private final ItemRepository repository;
    private final CategoryRepository categoryRepository;

    public ItemService(ItemRepository repository, CategoryRepository categoryRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
    }

    public List<Item> findAll() {return repository.findAll();};

    public List<Item> findByCategoryId(Integer categoryId) {
        Category category = categoryRepository.findById(categoryId);
        return category != null ? category.getItems() : new ArrayList<>();
    }

    public Item findById(int itemId) {return repository.findById(itemId);};

    public Result<Item> add(Item item) {
        Result<Item> result = validate(item);
        if (!result.isSuccess()) {
            return result;
        }
        if (item.getItemId() !=0) {
            result.addMessage("item id cannot be set for this operation", ResultType.INVALID);
        }
        item = repository.add(item);
        result.setPayload(item);
        return result;

    }
    public Result<Item> update(Item item) {
        Result<Item> result = validate(item);
        if (!result.isSuccess()) {
            return result;
        }

        if (item.getUserId() <= 0) {
            result.addMessage("user id is required", ResultType.INVALID);
        }

        if (item.getItemId() <= 0) {
            result.addMessage("item id must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(item)) {
            String msg = String.format("Item id: %s, not found", item.getItemId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int itemId) {
        return repository.deleteById(itemId);
    }

    private Result<Item> validate(Item item) {
        Result<Item> result = new Result<>();
        if (item == null) {
            result.addMessage("item cannot be null", ResultType.INVALID);
        }
        if (Validations.isNullOrBlank(item.getItemName())) {
            result.addMessage("item name is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(item.getDescription())) {
            result.addMessage("item description is required", ResultType.INVALID);
        }


        return result;
    }

}
