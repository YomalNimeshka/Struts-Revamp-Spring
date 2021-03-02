package com.springboot.example.springbootcrud.controller;

import com.springboot.example.springbootcrud.Model.navBarData.NavBar;
import com.springboot.example.springbootcrud.Model.page.Page;
import com.springboot.example.springbootcrud.entity.PageManagement;
import com.springboot.example.springbootcrud.entity.PageSectionsUserrolr;
import com.springboot.example.springbootcrud.entity.SectionManagement;
import com.springboot.example.springbootcrud.service.PageManagementService;
import com.springboot.example.springbootcrud.service.SectionMgtService;
import com.springboot.example.springbootcrud.service.pageSectionUser.PageSectionUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/Nav/")
public class NavBarController {

    private SectionMgtService sectionMgtService;
    private PageManagementService pageManagementService;
    private PageSectionUserService pageSectionUserService;

    @Autowired
    public NavBarController(SectionMgtService sectionMgtService, PageManagementService pageManagementService, PageSectionUserService pageSectionUserService) {
        this.sectionMgtService = sectionMgtService;
        this.pageManagementService = pageManagementService;
        this.pageSectionUserService = pageSectionUserService;
    }

    @GetMapping("NavData")
    public List<NavBar> findAll() {

        List<PageManagement> pages = new ArrayList<>();
        pages = pageManagementService.findAll();
        System.out.println(pages.toString());

        List<SectionManagement> Sections = new ArrayList<>();
        Sections = sectionMgtService.getAll();
        System.out.println(Sections.toString());

        List<PageSectionsUserrolr> AssignedData = new ArrayList<>();


        List<NavBar> navBarData = new ArrayList<NavBar>();


        int count = pages.size();
        int NavCount = Sections.size();

        NavBar[] nav = new NavBar[NavCount];
        for (int j = 0; j < Sections.size(); j++) {
            List<Page> subNavData = new ArrayList<Page>();
            nav[j] = new NavBar();
            nav[j].setTitle(Sections.get(j).getDescription());
            nav[j].setPath("/" + Sections.get(j).getDescription());
            String secCode = Sections.get(j).getSectionCode();
            AssignedData = pageSectionUserService.SearchAll(secCode, "test");
            System.out.println("-------------------------------------------------");
            System.out.println(AssignedData.toString());
            for (int i = 0; i < AssignedData.size(); i++) {
                String id = AssignedData.get(i).getPage();
                PageManagement page =  pageManagementService.findById(id);
                System.out.println(page.toString());
                Page[] pa = new Page[count];
                pa[i] = new Page();
                pa[i].setTitle(page.getDescription());
                pa[i].setPath(page.getUrl());
                subNavData.add(pa[i]);
                System.out.println(subNavData.toString());
            }
            nav[j].setSubNav(subNavData);
            navBarData.add(nav[j]);
        }
        return navBarData;
    }


}
