package com.springboot.example.springbootcrud.dao;

import com.springboot.example.springbootcrud.entity.PageManagement;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PageManagementRepo extends JpaRepository<PageManagement,String> {

    @Query(value = "SELECT u FROM PageManagement u where u.pageCode like :val%")
    List<PageManagement> SearchPages(String val);
}
