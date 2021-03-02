package com.springboot.example.springbootcrud.dao.pageSectionUserRole;

import com.springboot.example.springbootcrud.entity.PageManagement;
import com.springboot.example.springbootcrud.entity.PageSectionsUserrolr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PageSectionUserRoleRepo extends JpaRepository<PageSectionsUserrolr,Integer> {

    @Query(value = "SELECT u FROM PageSectionsUserrolr u where u.section =:val1 and u.userrole =:val2")
    List<PageSectionsUserrolr> SearchPages(String val1,String val2);
}
