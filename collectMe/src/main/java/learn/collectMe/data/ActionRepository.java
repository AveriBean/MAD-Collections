package learn.collectMe.data;

import learn.collectMe.models.Action;
import learn.collectMe.models.Item;

import java.util.List;

public interface ActionRepository {

    List<Action> findAll();

}
