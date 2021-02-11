package com.springboot.example.springbootcrud.controller;


import com.springboot.example.springbootcrud.entity.Employee;
import com.springboot.example.springbootcrud.entity.SectionManagement;
import com.springboot.example.springbootcrud.entity.UserManagement;
import com.springboot.example.springbootcrud.service.SectionMgtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/Section Mgt/")
public class SectionMgtController {
    private SectionMgtService sectionMgtService;

    @Autowired
    public SectionMgtController(SectionMgtService theSectionService){
        sectionMgtService = theSectionService;
    }

    //get all sections
    @GetMapping("All Sections")
    public List<SectionManagement> getAllSections(){
        //System.out.println(sectionMgtService.getAll());
        return sectionMgtService.getAll();
    }

    //add sections
    @PostMapping("Add Sections")
    public void addSection(@RequestBody SectionManagement section){
        //section addition
        sectionMgtService.addSection(section);
    }

    //get section with section code
    @GetMapping("Section-code/{sectionCode}")
    public SectionManagement getSectionByCode(@PathVariable String sectionCode){
        SectionManagement section = sectionMgtService.getSectionWithCode(sectionCode);
        return section;
    }

    //update section details
    @PutMapping("Section-update/{sectionCode}")
    public SectionManagement updateSection(@PathVariable String sectionCode, @RequestBody SectionManagement section){
        SectionManagement sectionManagement = sectionMgtService.getSectionWithCode(sectionCode);
        //System.out.println("emp id" +emp.toString());
        sectionManagement.setDescription(section.getDescription());
        sectionManagement.setStatus(section.getStatus());
        sectionManagement.setSortKey(section.getSortKey());
        sectionManagement.setRemarks(section.getRemarks());
        System.out.println("after changes "+sectionManagement.toString());

        sectionMgtService.updateSection(sectionManagement);
        return sectionManagement;
    }

    //delete section
    @DeleteMapping("Section-delete/{sectionCode}")
    public void deleteSection(@PathVariable String sectionCode){
        SectionManagement section = sectionMgtService.getSectionWithCode(sectionCode);
        sectionMgtService.deleteSection(sectionCode);
    }

    @GetMapping("SearchData/{val}")
    public List<SectionManagement> search(@PathVariable String val){
        return sectionMgtService.searchSortKeyData(val);
    }

}
