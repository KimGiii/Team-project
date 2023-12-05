package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName="set")
public class responseDTO<D> {
    private boolean result;
    private String message;
    private D data;

    public static <D> responseDTO<D> setSuccess(String message, D data) {
        return responseDTO.set(true, message, data);
    }

    public static <D> responseDTO<D> setFailed(String message) {
        return responseDTO.set(false, message, null);
    }
}
