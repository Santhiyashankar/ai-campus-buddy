package com.example.demo.service;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.example.demo.model.AppUser;
import com.example.demo.repository.AppUserRepository;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository repo;

    public AppUserService(AppUserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        AppUser user = repo.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email: " + email)
                );

        return User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles("USER") // must match your security config
                .build();
    }
}
