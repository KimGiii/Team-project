package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.likes_Entity;

@Repository
public interface likes_Repository extends JpaRepository<likes_Entity, Integer> {

}
