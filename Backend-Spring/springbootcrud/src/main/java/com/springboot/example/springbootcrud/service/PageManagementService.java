package com.springboot.example.springbootcrud.service;

import com.springboot.example.springbootcrud.dao.PageManagementRepo;
import com.springboot.example.springbootcrud.entity.PageManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PageManagementService implements PageManagementIF {

    private PageManagementRepo pageManagementRepo;

    @Autowired
    public PageManagementService(PageManagementRepo thePageManagementRepo) {
        pageManagementRepo = thePageManagementRepo;
    }

    @Override
    public List<PageManagement> findAll() {

        return pageManagementRepo.findAll();
    }

    @Override
    public PageManagement findById(String theId) {
        Optional<PageManagement> result =pageManagementRepo.findById(theId);
        PageManagement thePageManagement = null;

        if (result.isPresent()) {
            thePageManagement = result.get();
        }
        else {
            // we didn't find the employee
            throw new RuntimeException("Did not find employee id - " + theId);
        }

        return thePageManagement;
    }

    @Override
    public void save(PageManagement thePageManagement) {

        pageManagementRepo.save(thePageManagement);

    }

    @Override
    public void deleteById(String theId) {
        pageManagementRepo.deleteById(theId);

    }

    @Override
    public List<PageManagement> searchPages(String val) {

        return pageManagementRepo.SearchPages(val);
    }

}
