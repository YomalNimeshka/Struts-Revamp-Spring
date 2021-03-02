package com.springboot.example.springbootcrud.controller;

import com.springboot.example.springbootcrud.Model.PageSectionUser.PageSectionUserModel;
import com.springboot.example.springbootcrud.entity.PageSectionsUserrolr;
import com.springboot.example.springbootcrud.service.pageSectionUser.PageSectionUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/UserSectionPages/")
public class PageSectionUserController {

    private PageSectionUserService pageSectionUserService ;

    @Autowired
    public PageSectionUserController(PageSectionUserService thepageSectionUserService) {
        pageSectionUserService = thepageSectionUserService;
    }

    @GetMapping("PagesSectionsUser")
    public List<PageSectionsUserrolr> findAll(){
        return pageSectionUserService.findAll();
    }

    @PostMapping("AddPagesSectionsUser")
    public String Adduser(@RequestBody PageSectionUserModel pageSectionUserModel) {
        System.out.println(pageSectionUserModel.toString());
        ArrayList pagesData = new ArrayList();
        pagesData = pageSectionUserModel.getPageList();


        for (int i = 0; i < pagesData.size(); i++) {
            System.out.println(pagesData.get(i));
            PageSectionsUserrolr pageSectionsUserrole = new PageSectionsUserrolr();
            pageSectionsUserrole.setPage((String) pagesData.get(i));
            pageSectionsUserrole.setUserrole(pageSectionUserModel.getUserType());
            pageSectionsUserrole.setSection(pageSectionUserModel.getSectionCode());
            pageSectionUserService.save(pageSectionsUserrole);
        }

        return "success";
    }

    @GetMapping("AsasignPages/{Val1}/{val2}")
    public List<PageSectionsUserrolr> searchAll(@PathVariable String Val1,@PathVariable String val2){
        System.out.println(Val1+" and "+val2);
        return pageSectionUserService.SearchAll(Val1,val2);
    }
}
