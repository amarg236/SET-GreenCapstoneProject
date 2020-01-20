package com.setgreen.setgreencapstoneproject.model;

import lombok.Data;

@Data
public class ResponseBody {
    private int HttpStatusCode;
    private String Message;
    private Object Result;

    public ResponseBody(int httpStatusCode, String message, UserService result) {
        HttpStatusCode = httpStatusCode;
        Message = message;
        Result = result;
    }

	public int getHttpStatusCode() {
		return HttpStatusCode;
	}

	public void setHttpStatusCode(int httpStatusCode) {
		HttpStatusCode = httpStatusCode;
	}

	public String getMessage() {
		return Message;
	}

	public void setMessage(String message) {
		Message = message;
	}

	public Object getResult() {
		return Result;
	}

	public void setResult(Object result) {
		Result = result;
	}
    
}
