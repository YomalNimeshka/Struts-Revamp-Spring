package com.springboot.example.springbootcrud.service;

import com.springboot.example.springbootcrud.entity.UserManagement;

import java.util.List;

public interface UserMgtService {
    List<UserManagement> getAll();
    void addUser(UserManagement user);
    UserManagement getUserWithId(int id);
    void updateUser(UserManagement user);
    void deleteUser(int userId);
}
