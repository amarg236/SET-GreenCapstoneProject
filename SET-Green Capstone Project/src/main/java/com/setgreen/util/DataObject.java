package com.setgreen.util;

import lombok.Data;

/**
 * Allows you to send an object to contain/isolate primitive data types to make life better for the frontend people
 * @author Brendon Lebaron
 *
 * @param <T> Type of primitive
 */
@Data
public class DataObject<T> {
	private T data;
	public DataObject() {}
	public DataObject(T data){
		this.data = data;
	}
}
