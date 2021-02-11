package com.springboot.example.springbootcrud.controller;

import com.springboot.example.springbootcrud.entity.PageManagement;
import com.springboot.example.springbootcrud.entity.UserRoleManagement;
import com.springboot.example.springbootcrud.service.userrolemanagement.UserRoleManagementIF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserRoleManagementREST {

    private UserRoleManagementIF userRoleManagementIF;

    @Autowired
    public UserRoleManagementREST(UserRoleManagementIF theUserRoleManagementIF) {
        userRoleManagementIF = theUserRoleManagementIF;
    }

    @GetMapping("UserRoleData")
    public List<UserRoleManagement> findAll(){

        return userRoleManagementIF.findAll();
    }

    @GetMapping("UserRoleData/{userRoleCode}")
    public UserRoleManagement getPageD(@PathVariable String userRoleCode){
        System.out.println("userRoleCode"+userRoleCode);
        return userRoleManagementIF.findById(userRoleCode);
    }

    @GetMapping("SearchUserRoleData/{val}")
    public List<UserRoleManagement> searchPageD(@PathVariable String val){
        return userRoleManagementIF.searchUserRole(val);
    }

    @PostMapping("AddUserRole")
    public UserRoleManagement Adduser(@RequestBody UserRoleManagement userRoleManagement) {
        userRoleManagementIF.save(userRoleManagement);
        return userRoleManagement;
    }

    @PutMapping("UpdateUserRole")
    public UserRoleManagement updateEmployee(@RequestBody UserRoleManagement userRoleManagement) {
        userRoleManagementIF.save(userRoleManagement);
        return userRoleManagement;
    }

    @DeleteMapping("DeleteUserRole/{userRoleCode}")
    public String deletePageM(@PathVariable String userRoleCode){
        UserRoleManagement userR = userRoleManagementIF.findById(userRoleCode);
        if (userR == null) {
            throw new RuntimeException("User role id not found - " + userRoleCode);
        }
        userRoleManagementIF.deleteById(userRoleCode);
        return "Deleted employee id - " + userRoleCode;

    }
}
