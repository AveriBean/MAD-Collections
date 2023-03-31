package learn.collectMe.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import learn.collectMe.models.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.List;
import java.util.Date;

@Component
public class JwtConverter {
    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final String ISSUER = "collect-me";
    private static final int EXPIRATION_MINUTES = 15;
    private static final int EXPIRATION_MILLISECONDS = EXPIRATION_MINUTES * 60 * 1000;

    public String userToToken(User user) {

        List<String> authorities = user.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .toList();

        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(user.getUsername())
                .claim("appUserId", user.getUserId())
                .claim("authorities", authorities)
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("location", user.getLocation())
                .claim("phone", user.getPhone())
                .claim("email", user.getEmail())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLISECONDS))
                .signWith(key)
                .compact();
    }

    public User tokenToUser(String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            return null;
        }

        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.substring(7));

            String username = jws.getBody().getSubject();
            int userId = jws.getBody().get("userId", Integer.class);
            String firstName = jws.getBody().get("firstName", String.class);
            String lastName = jws.getBody().get("lastName", String.class);
            String location = jws.getBody().get("location", String.class);
            String phone = jws.getBody().get("phone", String.class);
            String email = jws.getBody().get("email", String.class);
            List<String> authorities = jws.getBody().get("authorities", List.class);

            User user = new User();
            user.setUserId(userId);
            user.setUsername(username);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setLocation(location);
            user.setPhone(phone);
            user.setEmail(email);
            user.addAuthorities(authorities);
            return user;

        } catch (JwtException ex) {
            System.out.println(ex.getMessage());
        }

        return null;
    }
}
