package learn.collectMe.models;

public class Action {

    private int actionId;
    private boolean viewable;
    private boolean tradeable;
    private boolean saleable;
    private boolean negotiable;


    public Action() {
    }

    public Action(int actionId, boolean viewable, boolean tradeable, boolean saleable, boolean negotiable) {
        this.actionId = actionId;
        this.viewable = viewable;
        this.tradeable = tradeable;
        this.saleable = saleable;
        this.negotiable = negotiable;
    }


    public int getActionId() {
        return actionId;
    }

    public void setActionId(int actionId) {
        this.actionId = actionId;
    }

    public boolean isViewable() {
        return viewable;
    }

    public void setViewable(boolean viewable) {
        this.viewable = viewable;
    }

    public boolean isTradeable() {
        return tradeable;
    }

    public void setTradeable(boolean tradeable) {
        this.tradeable = tradeable;
    }

    public boolean isSaleable() {
        return saleable;
    }

    public void setSaleable(boolean saleable) {
        this.saleable = saleable;
    }

    public boolean isNegotiable() {
        return negotiable;
    }

    public void setNegotiable(boolean negotiable) {
        this.negotiable = negotiable;
    }
}
