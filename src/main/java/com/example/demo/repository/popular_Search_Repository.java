package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.popular_Search_Entity;

@Repository
public interface popular_Search_Repository extends JpaRepository<popular_Search_Entity, String> {

}
