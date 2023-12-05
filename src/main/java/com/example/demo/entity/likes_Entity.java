package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="Liky")
@Table(name="Liky")
public class likes_Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeId;
    private int boardNumber;
    private String userEmail;
    private String likeUserName;
}