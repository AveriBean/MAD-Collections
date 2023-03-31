package learn.collectMe.controllers;

import learn.collectMe.models.User;
import learn.collectMe.security.JwtConverter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@CrossOrigin
@ConditionalOnWebApplication
public class AuthController {

    private final AuthenticationManager manager;
    private final JwtConverter converter;

    public AuthController(AuthenticationManager manager, JwtConverter converter) {
        this.manager = manager;
        this.converter = converter;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody User user) {

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                user.getUsername(), user.getPassword());

        try {
            Authentication authentication = manager.authenticate(token);
            if (authentication.isAuthenticated()) {
                User authenticatedUser = (User) authentication.getPrincipal();
                String jwt = converter.userToToken(authenticatedUser);
                HashMap<String, String> map = new HashMap<>();
                map.put("jwt", jwt);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
        } catch (AuthenticationException ex) {
            System.out.println(ex.getMessage());
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@AuthenticationPrincipal User user) {
        String jwt = converter.userToToken(user);
        HashMap<String, String> map = new HashMap<>();
        map.put("jwt", jwt);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
