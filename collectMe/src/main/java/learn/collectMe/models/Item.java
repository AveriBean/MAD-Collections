package learn.collectMe.models;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


public class Item {

    private int itemId;
    private String itemName;
    private String description;
    private BigDecimal value;
    private int userId;
    private List<Action> actions = new ArrayList<>();
    private List<Category> categories = new ArrayList<>();

    public List<Action> getActions() {
        return new ArrayList<>(actions);
    }
    public List<Category> getCategories() {
        return new ArrayList<>(categories);
    }


    public void setActions(List<Action> actions) {
        this.actions = actions;
    }
    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public boolean isViewable() {return actions.stream().anyMatch(a -> a.getStatus().equals("viewable"));}

    public boolean isTradeable() {
        return actions.stream().anyMatch(a -> a.getStatus().equals("tradeable"));
    }

    public boolean isSaleable() {return actions.stream().anyMatch(a -> a.getStatus().equals("saleable"));}

    public boolean isNegotiable() {
        return actions.stream().anyMatch(a -> a.getStatus().equals("saleable"));
    }



    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return itemId == item.itemId && userId == item.userId && itemName.equals(item.itemName) && description.equals(item.description) && Objects.equals(value, item.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemId, itemName, description, value, userId);
    }
}
