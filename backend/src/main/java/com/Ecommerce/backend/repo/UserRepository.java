package com.Ecommerce.backend.repo;

import com.Ecommerce.backend.entity.Category;
import com.Ecommerce.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
