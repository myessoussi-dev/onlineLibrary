package gl2.exemple.onlinelibrary.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "utilisateurs")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "login is required")
    @Column(unique = true,nullable = false)
    private String login;
    @NotBlank(message = "password is required")
    @Column(unique = true,nullable = false)
    private String password;
    @Email(message = "invalid Email")
    @NotBlank(message = "Email is required")
    @Column(unique = true,nullable = false)
    private String email;
    public enum Role{
        USER,ADMIN
    }
    @NotNull(message = "role is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role=Role.USER;

    public User(){}

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
}
