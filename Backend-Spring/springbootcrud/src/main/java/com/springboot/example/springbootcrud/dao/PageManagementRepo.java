package com.springboot.example.springbootcrud.dao;

import com.springboot.example.springbootcrud.entity.PageManagement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PageManagementRepo extends JpaRepository<PageManagement,String> {

}
