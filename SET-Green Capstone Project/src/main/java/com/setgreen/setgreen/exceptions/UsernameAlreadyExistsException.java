package com.setgreen.setgreen.exceptions;

public class UsernameAlreadyExistsException extends RuntimeException{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1830666600984884475L;

	public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}
