// src/main/java/com/mohit/Adhikari_marg_backend/config/ModelMapperConfig.java
package com.mohit.Adhikari_marg_backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}