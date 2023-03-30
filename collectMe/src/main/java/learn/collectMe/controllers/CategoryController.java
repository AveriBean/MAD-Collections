package learn.collectMe.controllers;

import learn.collectMe.domain.CategoryService;
import learn.collectMe.domain.Result;
import learn.collectMe.models.Category;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin
@RequestMapping("api/category")
public class CategoryController {
    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<Category> findAll() {return service.findAll();}

    @GetMapping("/{categoryId}")
    public Category findById(@PathVariable int categoryId) {
        return service.findById(categoryId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Category category) {
        Result<Category> result = service.add(category);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Object> update(@PathVariable int categoryId, @RequestBody Category category) {
        if (categoryId != category.getCategoryId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Category> result = service.update(category);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteById(@PathVariable int categoryId) {
        if (service.deleteById(categoryId)) {
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
