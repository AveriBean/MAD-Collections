package learn.collectMe.security;

import learn.collectMe.models.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtRequestFilter extends BasicAuthenticationFilter {

    private final JwtConverter converter;

    public JwtRequestFilter(AuthenticationManager authenticationManager, JwtConverter converter) {
        super(authenticationManager);
        this.converter = converter;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {

        String authorization = request.getHeader("Authorization");
        if (authorization != null) {
            // Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoZXJvZ...
            User user = converter.tokenToUser(authorization);
            if (user == null) {
                response.setStatus(403);
            } else {
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                        user, null, user.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(token);
            }
        }

        chain.doFilter(request, response);
    }
}
