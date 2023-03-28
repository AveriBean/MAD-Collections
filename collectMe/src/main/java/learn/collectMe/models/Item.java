package learn.collectMe.models;

import java.math.BigDecimal;
import java.util.Objects;

public class Item {

    private int itemId;
    private String itemName;
    private String description;
    private BigDecimal value;
    private int userId;

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
