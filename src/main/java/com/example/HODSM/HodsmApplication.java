package com.example.HODSM;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HodsmApplication {

	public static void main(String[] args) {
		SpringApplication.run(HodsmApplication.class, args);
	}

}



//Lekin important point: Docker ke bina bhi project ko normally run kar sakte ho, agar project ke required dependencies (Java/Node/MySQL etc.) manually installed hain.
//Dockerfile ka fayda mainly same environment mein easily run/deploy karna hai.


// docker image abhi maine upload kiya docker hub pr ab next process