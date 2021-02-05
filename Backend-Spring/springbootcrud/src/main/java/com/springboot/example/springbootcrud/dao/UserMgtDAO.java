package com.springboot.example.springbootcrud.dao;

import com.springboot.example.springbootcrud.entity.SectionManagement;
import com.springboot.example.springbootcrud.entity.UserManagement;

import java.util.List;

public interface UserMgtDAO {
    List<UserManagement> getAll();
    void addUser(UserManagement user);
    UserManagement getUserWithId(int id);
    void updateUser(UserManagement user);
    void deleteUser(int userId);
}
