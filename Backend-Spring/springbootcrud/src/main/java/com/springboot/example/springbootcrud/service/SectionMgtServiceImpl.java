package com.springboot.example.springbootcrud.service;

import com.springboot.example.springbootcrud.dao.EmployeeDAO;
import com.springboot.example.springbootcrud.dao.SectionMgtDAO;
import com.springboot.example.springbootcrud.entity.SectionManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SectionMgtServiceImpl implements SectionMgtService {

    private SectionMgtDAO sectionMgtDAO;

    @Autowired
    public SectionMgtServiceImpl(SectionMgtDAO theSectionDao){
        sectionMgtDAO = theSectionDao;
    }

    @Override
    @Transactional
    public List<SectionManagement> getAll() {
        return sectionMgtDAO.getAll();
    }

    @Override
    @Transactional
    public void addSection(SectionManagement section) {
        sectionMgtDAO.addSection(section);
    }

    @Override
    @Transactional
    public SectionManagement getSectionWithCode(String code) {
        return sectionMgtDAO.getSectionWithCode(code);
    }

    @Override
    @Transactional
    public void updateSection(SectionManagement section) {
        sectionMgtDAO.updateSection(section);
    }

    @Override
    @Transactional
    public void deleteSection(String section) {
        sectionMgtDAO.deleteSection(section);
    }
}
