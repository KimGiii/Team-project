package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.comments_Entity;

@Repository
public interface comments_Repository extends JpaRepository<comments_Entity, Integer> {

}
