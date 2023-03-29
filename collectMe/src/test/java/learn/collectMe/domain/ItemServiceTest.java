package learn.collectMe.domain;

import learn.collectMe.data.ItemRepository;
import learn.collectMe.models.Item;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static learn.collectMe.TestHelper.makeItem;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ItemServiceTest {
    @Autowired
    ItemService service;

    @MockBean
    ItemRepository repository;

    @Test
    void shouldFindItem() {
        Item expected = makeItem();
        when(repository.findById(1)).thenReturn(expected);
        Item actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddWhenInvalid() {
        Item item = makeItem();
        Result<Item> result = service.add(item);
        assertEquals(ResultType.INVALID, result.getType());
        item.setItemId(0);
        item.setItemName(null);
        result = service.add(item);
        assertEquals(ResultType.INVALID, result.getType());
        assertTrue(result.getMessages().contains("item name is required"));

    }

    @Test
    void shouldAddWhenValid() {
        Item expected = makeItem();
        Item arg = makeItem();
        arg.setItemId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<Item> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());

        assertEquals(expected, result.getPayload());

    }

}