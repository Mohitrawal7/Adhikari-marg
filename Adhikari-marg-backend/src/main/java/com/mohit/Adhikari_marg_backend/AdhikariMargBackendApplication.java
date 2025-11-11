package com.mohit.Adhikari_marg_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AdhikariMargBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdhikariMargBackendApplication.class, args);
	}

}
