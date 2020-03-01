package com.setgreen.setgreen.model;

import lombok.Data;

/**
 * @author Brendon LeBaron
 *
 * @param <T> Type of object that will be in Result
 */
@Data
public class ResponseBody<T> {
    private int HttpStatusCode;
    private String Message;
    private T Result;

    public ResponseBody(int httpStatusCode, String message, T result) {
        HttpStatusCode = httpStatusCode;
        Message = message;
        Result = result;
    }
}
