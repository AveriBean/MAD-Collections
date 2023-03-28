package learn.collectMe.data;

import learn.collectMe.models.Action;

import java.util.List;

public interface ActionRepository {
    List<Action> findAll();

    Action findById(int actionId);
}
