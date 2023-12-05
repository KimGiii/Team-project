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
@Entity(name="Board")
@Table(name="board")
public class board_Entity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNumber;
    private String boardVideoId;
    private String boardGenre;
    private String boardTitle;
}
