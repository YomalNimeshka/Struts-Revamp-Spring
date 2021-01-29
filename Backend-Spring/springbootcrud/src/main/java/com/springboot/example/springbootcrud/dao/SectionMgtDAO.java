package com.springboot.example.springbootcrud.dao;


import com.springboot.example.springbootcrud.entity.SectionManagement;

import java.util.List;

public interface SectionMgtDAO {
    List<SectionManagement> getAll();
    void addSection(SectionManagement section);
    SectionManagement getSectionWithCode(String code);
    void updateSection(SectionManagement section);
    void deleteSection(String section);

}
