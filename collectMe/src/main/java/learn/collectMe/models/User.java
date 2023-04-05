
package learn.collectMe.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class User implements UserDetails {

    private int userId;
    private String firstName;
    private String lastName;
    private String location;
    private String username;
    private String password;
    private String phone;
    private String email;
    private boolean enabled = true;
    private boolean locked;
    private Collection<GrantedAuthority> authorities = new ArrayList<>();
    List<Item> items = new ArrayList<>();

    public User() {

    }

    public User(int userId, String firstName, String lastName, String location, String phone, String email) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.location = location;
        this.phone = phone;
        this.email = email;
    }

    public User( int userId, String username, String firstName, String lastName, String location, String password, String phone, String email, boolean enabled, List<String> roles) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.location = location;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.enabled = enabled;
        convertRolesToAuthorities(roles);

    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public List<Item> getItems() {
        return new ArrayList<>(items);
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return new ArrayList<>(authorities);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public void convertRolesToAuthorities(List<String> roles) {
        this.authorities = roles.stream()
                .map(r -> new SimpleGrantedAuthority(r))
                .collect(Collectors.toList());
    }

    public void addAuthorities(Collection<String> authorityNames) {
        authorities.clear();
        for (String name : authorityNames) {
            authorities.add(new SimpleGrantedAuthority(name));
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return userId == user.userId && enabled == user.enabled && firstName.equals(user.firstName) && lastName.equals(user.lastName) && Objects.equals(location, user.location) && username.equals(user.username) && password.equals(user.password) && Objects.equals(phone, user.phone) && email.equals(user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, firstName, lastName, location, username, password, phone, email, enabled);
    }
}

