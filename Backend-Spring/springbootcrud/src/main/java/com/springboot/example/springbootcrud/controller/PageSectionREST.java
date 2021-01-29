package com.springboot.example.springbootcrud.controller;

import com.springboot.example.springbootcrud.entity.Employee;
import com.springboot.example.springbootcrud.entity.PageManagement;
import com.springboot.example.springbootcrud.service.PageManagementIF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PageSectionREST {

    private PageManagementIF pageManagementIF;

    @Autowired
    public PageSectionREST(PageManagementIF thePageManagementIF) {
        pageManagementIF = thePageManagementIF;
    }

    @GetMapping("PageMRecords")
    public List<PageManagement> findAll(){
        return pageManagementIF.findAll();
    }
    @GetMapping("PageMRecord/{pageCode}")
    public PageManagement getPageD(@PathVariable String pageCode){
        return pageManagementIF.findById(pageCode);
    }
    @PostMapping("AddPage")
    public PageManagement AddEmployee(@RequestBody PageManagement pageManagement) {
        pageManagementIF.save(pageManagement);
        return pageManagement;
    }

    @PutMapping("updatePageM")
    public PageManagement updateEmployee(@RequestBody PageManagement pageManagement) {
        pageManagementIF.save(pageManagement);
        return pageManagement;
    }

    @DeleteMapping("DeletePageM/{pageCode}")
    public String deletePageM(@PathVariable String pageCode){
        PageManagement pageM = pageManagementIF.findById(pageCode);
        if (pageM == null) {
            throw new RuntimeException("Employee id not found - " + pageCode);
        }
        pageManagementIF.deleteById(pageCode);
        return "Deleted employee id - " + pageCode;

    }




}
