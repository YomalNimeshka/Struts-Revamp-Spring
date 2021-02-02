package com.springboot.example.springbootcrud.service;

import com.springboot.example.springbootcrud.entity.PageManagement;

import java.util.List;

public interface PageManagementIF {

    public List<PageManagement> findAll();

    public PageManagement findById(String theId);

    public void save(PageManagement thePageManagement);

    public void deleteById(String theId);

    public List<PageManagement> searchPages(String val);



}
