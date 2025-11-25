package com.main.services;

import com.main.models.UserModel;
import com.main.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public Optional<UserModel> findByEmail(String email) {
        return repository.findByEmail(email);
    }
}
