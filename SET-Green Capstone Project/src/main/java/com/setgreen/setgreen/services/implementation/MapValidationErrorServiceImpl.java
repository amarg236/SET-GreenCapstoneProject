package com.setgreen.setgreen.services.implementation;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import com.setgreen.setgreen.services.MapValidationErrorService;

@Service
public class MapValidationErrorServiceImpl implements MapValidationErrorService {
    @Override
    public ResponseEntity<?> MapValidationService(BindingResult result) {
        if(result.hasErrors()){
            Map<String,String> errorMap = new HashMap<>();

            for (FieldError error: result.getFieldErrors()){
                errorMap.put(error.getField(),error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String,String>>(errorMap, HttpStatus.BAD_REQUEST);
        }
        return null;
    }
}
