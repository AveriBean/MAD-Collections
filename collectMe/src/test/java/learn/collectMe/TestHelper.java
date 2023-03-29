package learn.collectMe;

import learn.collectMe.domain.Result;
import learn.collectMe.domain.ResultType;
import learn.collectMe.models.Action;
import learn.collectMe.models.Category;
import learn.collectMe.models.Item;

import java.time.LocalDate;
import java.util.List;

public class TestHelper {
    public static <T> Result<T> makeResult(String message, ResultType type) {
        Result<T> result = new Result<>();
        result.addMessage(message, type);
        return result;
    }

    public static <T> Result<T> makeResult(T payload) {
        Result<T> result = new Result<>();
        result.setPayload(payload);
        return result;
    }

    public static Item makeItem() {

        Item item = new Item();

        item.setItemId(0);
        item.setItemName("Bulbasor 31");
        item.setDescription("This is a Bulbasor 31 card in mint condition");
        item.setUserId(1);

        item.setActions(List.of(
                new Action(1,"viewable"),
                new Action(3, "saleable")
                ));

        item.setCategories(List.of(
                new Category(1,"Pokemon")
        ));

        return item;
    }
}