package com.springboot.example.springbootcrud.service.userrolemanagement;

import com.springboot.example.springbootcrud.entity.UserRoleManagement;

import java.util.List;

public interface UserRoleManagementIF {

    public List<UserRoleManagement> findAll();

    public UserRoleManagement findById(String theId);

    public void save(UserRoleManagement theUserRoleManagement);

    public void deleteById(String theId);

    public List<UserRoleManagement> searchUserRole(String val);
}
