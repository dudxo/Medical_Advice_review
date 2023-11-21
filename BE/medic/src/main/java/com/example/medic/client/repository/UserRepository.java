package com.example.medic.client.repository;

import com.example.medic.client.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Client,String> {
}
