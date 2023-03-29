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

}