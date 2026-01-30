package com.mohit.Adhikari_marg_backend;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AdhikariMargBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdhikariMargBackendApplication.class, args);
	}


	@PostConstruct
	public void checkEnv() {
		System.out.println("URL=" + System.getenv("SPRING_DATASOURCE_URL"));
		System.out.println("USER=" + System.getenv("SPRING_DATASOURCE_USERNAME"));
	}


}
