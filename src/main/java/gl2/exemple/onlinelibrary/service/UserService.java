package gl2.exemple.onlinelibrary.service;

import gl2.exemple.onlinelibrary.DTO.LoginDTO;
import gl2.exemple.onlinelibrary.DTO.RegistryRequest;
import gl2.exemple.onlinelibrary.model.User;
import gl2.exemple.onlinelibrary.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepositoryord){
        this.userRepository= userRepositoryord;
    }
    public User registry(RegistryRequest registryRequest){
        User user=new User();
        user.setEmail(registryRequest.getEmail());
        user.setLogin(registryRequest.getLogin());
        user.setPassword(registryRequest.getPassword());
        return userRepository.save(user);
    }
    public User login(LoginDTO loginDTO){
        User user=userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(()->
                new RuntimeException("User not found"));
        if (!user.getPassword().equals(loginDTO.getPassword())){
            throw new RuntimeException("Invalid Password");
        }
        return user;
    }
}
