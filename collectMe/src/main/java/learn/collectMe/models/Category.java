package learn.collectMe.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Category {

    private int categoryId;

    private String categoryName;

    private List<Item> items = new ArrayList<>();

    public Category() {}


    public Category(int categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }


    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<Item> getItems() { return new ArrayList<>(items); }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return categoryId == category.categoryId && Objects.equals(categoryName, category.categoryName) && Objects.equals(items, category.items);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, categoryName, items);
    }
}
