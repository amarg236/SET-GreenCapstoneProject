package com.setgreen.setgreencapstoneproject.model;

import lombok.Data;

@Data
public class ResponseBody {
    private int HttpStatusCode;
    private String Message;
    private Object Result;

    public ResponseBody(int httpStatusCode, String message, Object result) {
        HttpStatusCode = httpStatusCode;
        Message = message;
        Result = result;
    }
}
