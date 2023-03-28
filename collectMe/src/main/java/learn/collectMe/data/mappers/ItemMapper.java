package learn.collectMe.data.mappers;

import learn.collectMe.models.Item;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ItemMapper implements RowMapper<Item> {

    @Override
    public Item mapRow(ResultSet resultSet, int i) throws SQLException {
        Item item = new Item();
        item.setItemId(resultSet.getInt("item_id"));
        item.setItemName(resultSet.getString("name"));
        item.setDescription(resultSet.getString("description"));
        item.setValue(resultSet.getBigDecimal("value"));
        item.setUserId(resultSet.getInt("user_id"));
        return item;
    }
}
