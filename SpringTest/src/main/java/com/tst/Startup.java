//Note that the .pom used by Maven is apparently magic and bullshit. I've had to fix it 2 or 3 times by hand now and each time I do so I'm reminded how much I hate looking at XML. It should work for a standard Eclipse setup.
package com.tst;

//import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication //Declares this to be the main app bit. Shorthand for some other things, I'm sure google knows what I don't remember.
public class Startup {

	public static void main(String[] args) {
		SpringApplication.run(Startup.class, args); //We say  we're going to run this class. I don't know the exact in's and outs, but I'd think it's basically sending off to it's classes to do some dirty work, since preprocessing seems to be a factor with the added bits and bobs.
	}

	@Bean //beans are objects and managed by the Spring container
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) { //Should say "hey run this m8 kthx." to the magic under the hood of Spring
		return args -> {
			
			/*
			System.out.println("Let's inspect the beans provided by Spring Boot:");//This prints out before a longass list of what I assume is....
			String[] beanNames = ctx.getBeanDefinitionNames();//all the names of stuff we're using on our server instance.
			Arrays.sort(beanNames); //sort & print. All of this is extra BS for the sake of it, I'd assume it's so you know what you're running when you launch out.
			for (String beanName : beanNames) {
				System.out.println(beanName);
			}
			*/

		};
	}

}