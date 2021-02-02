package com.springboot.example.springbootcrud.dao;


import com.springboot.example.springbootcrud.entity.UserRoleManagement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRoleManagementRepo extends JpaRepository<UserRoleManagement,String> {

    @Query(value = "SELECT u FROM UserRoleManagement u where u.userRoleType like :val%")
    List<UserRoleManagement> SearchUserRole(String val);
}
