package learn.collectMe.data;

import learn.collectMe.models.Item;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static learn.collectMe.TestHelper.makeItem;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ItemJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 10;
@Autowired
    ItemJdbcTemplateRepository repository;

@Autowired
    KnownGoodState knownGoodState;

@BeforeEach
    void setup() {knownGoodState.set();}

@Test
    void shouldFindAll() {
    List<Item> items = repository.findAll();
    assertNotNull(items);
    assertTrue(items.size()>= 8 && items.size() <= 11);
}

@Test
    void shouldFindPokemonCardA() {
    Item item = repository.findById(1);
    assertNotNull(item);
    assertTrue(item.getItemName().contains("Pokemon card A"));
}

@Test
    void shouldNotFindInvalidItemId() {
    assertNull(repository.findById(50));
}

@Test
    void shouldAdd() {
    Item item = makeItem();
    Item actual = repository.add(item);
    assertNotNull(actual);
    assertEquals(NEXT_ID, actual.getItemId());
}

@Test
    void shouldUpdate() {
    Item item = makeItem();
    item.setItemId(6);
    assertTrue(repository.update(item));
    item.setItemId(500);
    assertFalse(repository.update(item));
}

@Test
    void shouldDelete() {
    assertTrue(repository.deleteById(3));
    assertFalse(repository.deleteById(3));
}


}