package learn.collectMe.domain;

import learn.collectMe.data.ActionRepository;
import learn.collectMe.models.Action;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionService {

    private final ActionRepository actionRepository;

    public ActionService(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    public List<Action> findAll() { return actionRepository.findAll(); }
}
