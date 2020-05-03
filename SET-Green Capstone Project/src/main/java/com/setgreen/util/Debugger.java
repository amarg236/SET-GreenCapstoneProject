package com.setgreen.util;

public class Debugger {
	public static boolean MODE_ON = true; //TODO turn off
	public static void cout(String s) {
		if(MODE_ON)
			System.out.print(s);
	}
}
