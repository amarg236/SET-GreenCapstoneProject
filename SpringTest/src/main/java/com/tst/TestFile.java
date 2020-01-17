package com.tst;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin() //This is for the CORS policy. Admittedly I'm not super read up on this, but without this JavaScript throws a hissy fit when sending/receiving data.
@RestController //Declares this bit as a controller for when data comes in. I think it's shorthand for several other calls, but that's for google to know and me to find out if it becomes relevent.
public class TestFile {
	
	//Request mapping is the "end" of the URL. When a ping comes in on this channel the method below it will be the response. There's specific post/get mappings as well if that comes up.
	@RequestMapping("/")//This is the "default" return btw. Going to (in our case when locally hosted) localhost:8080 will return the message below.
	public String index() {//this is just the method that'll return on this channel.
		return "Greetings from Spring Boot!";
	}

	@RequestMapping("/hw")
	public String hw() { //note that HTML works and can be thrown to the browser (launch app and go to localhost:8080/hw to see this using the h1 tag)
		return "<h1>Hello World</h1>";
	}
	
	@RequestMapping("/dataTest") //I'd imagine we could do a lot of logic here in terms of what data to send. When we define the application interface requirements we can expand here.
	public String dtaTst(@ModelAttribute("nfo") String nfo) {//the ModeAttribute thing is so we know what the OBJECT KEY we're looking for is. If we throw an object with 50 different keys we could (I assume) have 50 different arguments passed. This becomes important because if we decide that all "send" requests will use an object named "myData" we need to sort out what the data is on the backend. Otherwise frontend has to make sure to call to the correct backend method to get stuff done. Frontend expansion causes bloat, backend expansion causes extra logic/server work, pick your poison.
		//This just shows off returning static data, data sent to the server from Javascript, and an independently calculated value. I'm not a mathmatition, yeah that random number generation is most likely sub par, but I don't care to fix it for a demo.
		return "this is data from the java program and what you sent: \"" + nfo + "\"\n and here's a sorta random number from 1-100: "+(int)(Math.random()*100%100+1);
	}
	
}