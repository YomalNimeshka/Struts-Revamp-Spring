package com.springboot.example.springbootcrud.service;

import com.springboot.example.springbootcrud.dao.SectionMgtDAO;
import com.springboot.example.springbootcrud.dao.UserMgtDAO;
import com.springboot.example.springbootcrud.entity.UserManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserMgtServiceImpl implements UserMgtService {
    private UserMgtDAO userMgtDAO;

    @Autowired
    public UserMgtServiceImpl(UserMgtDAO theUserDao){
        userMgtDAO = theUserDao;
    }

    @Override
    @Transactional
    public List<UserManagement> getAll() {
        return userMgtDAO.getAll();
    }

    @Override
    @Transactional
    public void addUser(UserManagement user) {
        userMgtDAO.addUser(user);
    }

    @Override
    @Transactional
    public UserManagement getUserWithId(int id) {
        return userMgtDAO.getUserWithId(id);
    }

    @Override
    @Transactional
    public void updateUser(UserManagement user) {
        userMgtDAO.updateUser(user);
    }

    @Override
    @Transactional
    public void deleteUser(int userId) {
        userMgtDAO.deleteUser(userId);
    }

    @Override
    @Transactional
    public List<UserManagement> searchUserRoleData(String val) {
        return userMgtDAO.searchUserRoleData(val);
    }
}
