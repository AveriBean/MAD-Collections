package learn.collectMe.models;


import java.util.Objects;

import java.util.ArrayList;
import java.util.List;


public class Action {

    private int actionId;

    private String status;


    public Action() {
    }

    public Action(int actionId, String status) {
        this.actionId = actionId;
        this.status = status;
    }


    public int getActionId() {
        return actionId;
    }

    public void setActionId(int actionId) {
        this.actionId = actionId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Action action = (Action) o;
        return actionId == action.actionId && Objects.equals(status, action.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(actionId, status);
    }

}
