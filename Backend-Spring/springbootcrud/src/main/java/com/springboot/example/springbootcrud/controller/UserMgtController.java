package com.springboot.example.springbootcrud.controller;

import com.springboot.example.springbootcrud.entity.Employee;
import com.springboot.example.springbootcrud.entity.SectionManagement;
import com.springboot.example.springbootcrud.entity.UserManagement;
import com.springboot.example.springbootcrud.service.SectionMgtService;
import com.springboot.example.springbootcrud.service.UserMgtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/User Mgt/")
public class UserMgtController {
    private UserMgtService userMgtService;

    @Autowired
    public UserMgtController(UserMgtService theUserService){
        userMgtService = theUserService;
    }

    //get all sections
    @GetMapping("All Users")
    public List<UserManagement> getAllUsers(){
        //System.out.println(sectionMgtService.getAll());
        return userMgtService.getAll();
    }

    //add user
    @PostMapping("Add Users")
    public void addUser(@RequestBody UserManagement user){
        //user addition
        System.out.println("add method called");
        userMgtService.addUser(user);
    }

    @GetMapping("EmployeeId/{employeeId}")
    public UserManagement getUserById(@PathVariable Integer employeeId){
        UserManagement user = userMgtService.getUserWithId(employeeId);
        return user;
    }

    @PutMapping("UpdateUser/{employeeId}")
    public UserManagement updateUser(@PathVariable Integer employeeId, @RequestBody UserManagement updateUser){
        UserManagement user = userMgtService.getUserWithId(employeeId);
        //System.out.println("emp id" +emp.toString());
        user.setUsername(updateUser.getUsername());
        user.setFullName(updateUser.getFullName());
        user.setUserRole(updateUser.getUserRole());
        user.setEmail(updateUser.getEmail());
        System.out.println("after changes "+user.toString());

        userMgtService.updateUser(user);
        return user;
    }

    @DeleteMapping("DeleteUser/{employeeId}")
    public void deleteUser(@PathVariable Integer employeeId){
        UserManagement user = userMgtService.getUserWithId(employeeId);
        userMgtService.deleteUser(employeeId);
    }
}
