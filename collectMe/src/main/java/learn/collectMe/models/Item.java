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
    private String image;
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

    public boolean isViewable() {
        return actions.stream().anyMatch(a -> a.getStatus().equals("viewable"));}

    public boolean isTradeable() {
        return actions.stream().anyMatch(a -> a.getStatus().equals("tradeable"));
    }

    public boolean isSaleable() {
        return actions.stream().anyMatch(a -> a.getStatus().equals("saleable"));}

    public boolean isNegotiable() {
        return actions.stream().anyMatch(a -> a.getStatus().equals("negotiable"));
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return itemId == item.itemId && userId == item.userId && Objects.equals(itemName, item.itemName) && Objects.equals(description, item.description) && Objects.equals(value, item.value) && Objects.equals(image, item.image) && Objects.equals(actions, item.actions) && Objects.equals(categories, item.categories);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemId, itemName, description, value, userId, image, actions, categories);
    }
}
