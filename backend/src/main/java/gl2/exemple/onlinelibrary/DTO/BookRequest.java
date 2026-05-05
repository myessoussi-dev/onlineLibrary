package gl2.exemple.onlinelibrary.DTO;

import jakarta.validation.constraints.NotBlank;

public class BookRequest {
    @NotBlank(message = "title is required")
    private String title ;
    @NotBlank(message = "description is required")
    private String description;
    @NotBlank(message = "author name is required")
    private String authorName;
    @NotBlank(message = "category name is required")
    private String categoryName;
    @NotBlank(message = "image url is required")
    private String imageUrl;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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
