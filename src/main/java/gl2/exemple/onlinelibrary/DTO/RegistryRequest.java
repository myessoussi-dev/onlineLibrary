package gl2.exemple.onlinelibrary.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegistryRequest {
    @NotBlank(message = "login is required")
    private String login;
    @NotBlank(message = "password is required")
    private String password;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email")
    private String email;

    public RegistryRequest() {
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
