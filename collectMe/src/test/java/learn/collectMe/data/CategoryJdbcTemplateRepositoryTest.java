package learn.collectMe.data;

import learn.collectMe.models.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CategoryJdbcTemplateRepositoryTest {

    @Autowired
    CategoryJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldFindCategories() {
        List<Category> categories = repository.findAll();

        assertNotNull(categories);
        assertTrue(categories.size() > 0);
    }

    @Test
    void shouldFindMagic() {
        Category magic = repository.findById(2);

        assertEquals(2, magic.getCategoryId());
        assertEquals("Magic", magic.getCategoryName());
        assertEquals(3, magic.getItems().size());
    }

    @Test
    void shouldAddStamp() {
        Category category = new Category();
        category.setCategoryName("Stamp");

        Category actual = repository.add(category);

        assertNotNull(actual);
        assertEquals(4, actual.getCategoryId());
        assertEquals(4, repository.findAll().size());
        assertEquals("Stamp", repository.findById(4).getCategoryName());
    }
}