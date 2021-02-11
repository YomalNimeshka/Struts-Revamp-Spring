package com.springboot.example.springbootcrud.service.userrolemanagement;

import com.springboot.example.springbootcrud.dao.UserRoleManagementRepo;
import com.springboot.example.springbootcrud.entity.UserRoleManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserRoleManagementService implements UserRoleManagementIF {

    private UserRoleManagementRepo userRoleManagementRepo;

    @Autowired
    public UserRoleManagementService(UserRoleManagementRepo theUserRoleManagementRepo) {
        userRoleManagementRepo = theUserRoleManagementRepo;
    }

    @Override
    public List<UserRoleManagement> findAll() {

        return userRoleManagementRepo.findAll();
    }

    @Override
    public UserRoleManagement findById(String theId) {
        Optional<UserRoleManagement> result = userRoleManagementRepo.findById(theId);
        UserRoleManagement userRoleManagement;
        if (result.isPresent()) {
            userRoleManagement = result.get();
        }
        else {
            // we didn't find the user
            throw new RuntimeException("Did not find user id - " + theId);
        }
        return userRoleManagement;
    }

    @Override
    public void save(UserRoleManagement theUserRoleManagement) {
        userRoleManagementRepo.save(theUserRoleManagement);

    }

    @Override
    public void deleteById(String theId) {
        userRoleManagementRepo.deleteById(theId);
    }

    @Override
    public List<UserRoleManagement> searchUserRole(String val) {
        return userRoleManagementRepo.SearchUserRole(val);
    }
}
