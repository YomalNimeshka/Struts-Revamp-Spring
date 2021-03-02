package com.springboot.example.springbootcrud.service.pageSectionUser;

import com.springboot.example.springbootcrud.dao.EmployeeDAO;
import com.springboot.example.springbootcrud.dao.pageSectionUserRole.PageSectionUserRoleRepo;
import com.springboot.example.springbootcrud.entity.PageSectionsUserrolr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageSectionUserImpl implements PageSectionUserService{

    private PageSectionUserRoleRepo pageSectionUserRoleRepo;

    @Autowired
    public PageSectionUserImpl(PageSectionUserRoleRepo thePageSectionUserRoleRepo) {
        pageSectionUserRoleRepo = thePageSectionUserRoleRepo;
    }

    @Override
    public List<PageSectionsUserrolr> findAll() {

        return pageSectionUserRoleRepo.findAll();
    }

    @Override
    public List<PageSectionsUserrolr> SearchAll(String val1,String Val2) {
        return pageSectionUserRoleRepo.SearchPages(val1,Val2);
    }


    @Override
    public void save(PageSectionsUserrolr thePageSectionsUserrolr) {
        pageSectionUserRoleRepo.saveAndFlush(thePageSectionsUserrolr);
    }



}
