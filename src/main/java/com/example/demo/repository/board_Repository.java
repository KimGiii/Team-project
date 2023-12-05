package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.board_Entity;

@Repository
public interface board_Repository extends JpaRepository<board_Entity, Integer> {
}
