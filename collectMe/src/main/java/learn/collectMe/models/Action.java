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


}
