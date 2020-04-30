package com.setgreen.util;

public class Debugger {
	public static boolean MODE_ON = false;
	public static void cout(String s) {
		if(MODE_ON)
			System.out.print(s);
	}
}
