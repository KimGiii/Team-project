package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.user_Entity;

@Repository
public interface user_Repository extends JpaRepository<user_Entity, String> {
    public boolean existsByEmailAndPassword(String email, String password);
}
