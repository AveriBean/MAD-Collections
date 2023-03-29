package learn.collectMe.domain;

import learn.collectMe.data.CategoryRepository;
import learn.collectMe.models.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.stereotype.Service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CategoryServiceTest {
    @Autowired
    CategoryService service;
    @MockBean
    CategoryRepository repository;

    @Test
    void shouldAdd() {
        Category category = new Category(0, "Bicycles");
        Category mockOut = new Category(4, "Bicycles");
        when(repository.add(category)).thenReturn(mockOut);
        Result<Category> actual = service.add(category);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        Category category = new Category(5, "Bicycles");
        Result<Category> result = service.add(category);
        assertEquals(ResultType.INVALID, result.getType());
        assertTrue(result.getMessages().contains("category id cannot be set for `add` operation"));
    }

    @Test
    void shouldUpdate() {
        Category category = new Category(1,"Bicycles");

        when(repository.update(category)).thenReturn(true);
        Result<Category> actual = service.update(category);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }
    @Test
    void shouldNotUpdateMissing() {
        Category category = new Category(50,"Bicycles");

        when(repository.update(category)).thenReturn(false);
        Result<Category> actual = service.update(category);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldDelete() {
        Category category = new Category(2,"Bicycles");
        when(repository.deleteById(2)).thenReturn(true);
        assertTrue(service.deleteById(2));
    }

}