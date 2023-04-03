package learn.collectMe.controllers;

import learn.collectMe.domain.ItemService;
import learn.collectMe.domain.Result;
import learn.collectMe.models.Item;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/item")
public class ItemController {
    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<Item> findAll() { return service.findAll(); }

    @GetMapping("/category/{categoryId}")
    public List<Item> findAllByCategory(@PathVariable Integer categoryId) {
        return service.findByCategoryId(categoryId);
    }

    @GetMapping("/{itemId}")
    public Item findById(@PathVariable int itemId) {
        return service.findById(itemId);
    }

   @PostMapping
    public ResponseEntity<Object> add(@RequestBody Item item) {
       Result<Item> result = service.add(item);
       if (result.isSuccess()) {
           return new ResponseEntity<>(HttpStatus.CREATED);
       }
       return ErrorResponse.build(result);
   }

   @PutMapping("/{itemId}")
    public ResponseEntity<Object> update(@PathVariable int itemId, @RequestBody Item item) {
        if (itemId != item.getItemId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Item> result = service.update(item);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return ErrorResponse.build(result);
   }

   @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteById(@PathVariable int itemId) {
        if (service.deleteById(itemId)) {
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }


}
