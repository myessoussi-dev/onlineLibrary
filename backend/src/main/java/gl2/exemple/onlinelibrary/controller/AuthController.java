package gl2.exemple.onlinelibrary.controller;

import gl2.exemple.onlinelibrary.DTO.LoginDTO;
import gl2.exemple.onlinelibrary.DTO.RegistryRequest;
import gl2.exemple.onlinelibrary.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/registry")
    public void registry(@Valid @RequestBody RegistryRequest registryRequest){
        userService.registry(registryRequest);
    }
    @PostMapping("/login")
    public void login(@Valid @RequestBody LoginDTO loginDTO){
        userService.login(loginDTO);
    }
}
