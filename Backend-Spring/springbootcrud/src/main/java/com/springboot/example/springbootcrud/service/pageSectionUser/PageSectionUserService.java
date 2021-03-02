package com.springboot.example.springbootcrud.service.pageSectionUser;

import com.springboot.example.springbootcrud.entity.PageSectionsUserrolr;

import java.util.List;

public interface PageSectionUserService {

    public List<PageSectionsUserrolr> findAll();
    public List<PageSectionsUserrolr> SearchAll(String val1,String Val2);
    public void save(PageSectionsUserrolr thePageSectionsUserrolr);

}
