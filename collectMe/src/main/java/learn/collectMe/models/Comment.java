package learn.collectMe.models;

import java.util.ArrayList;
import java.util.List;

public class Comment {


    private int commentId;
    private int userId;
    private int itemId;
    private String content;

    public Comment(int commentId, int userId, int itemId, String content) {
        this.commentId = commentId;
        this.userId = userId;
        this.itemId = itemId;
        this.content = content;
    }

    public Comment() {

    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
