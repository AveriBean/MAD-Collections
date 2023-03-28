package learn.collectMe.data;

import learn.collectMe.models.Action;

import java.util.List;

public interface ActionRepository {
    Action add(Action action);

    boolean update(Action action);

    boolean deleteById(int actionId);
}
