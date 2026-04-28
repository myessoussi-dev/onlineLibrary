package gl2.exemple.onlinelibrary.DTO;

public class BookRequest {
    private String title ;
    private String description;
    private String authorName;
    private String categoryName;

    public BookRequest(String title, String description, String authorName, String categoryName) {
        this.title = title;
        this.description = description;
        this.authorName = authorName;
        this.categoryName = categoryName;
    }

    public BookRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
