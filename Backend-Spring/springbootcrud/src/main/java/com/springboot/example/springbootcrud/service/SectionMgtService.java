package com.springboot.example.springbootcrud.service;

import com.springboot.example.springbootcrud.entity.SectionManagement;

import java.util.List;

public interface SectionMgtService {
    List<SectionManagement> getAll();
    void addSection(SectionManagement section);
    SectionManagement getSectionWithCode(String code);
    void updateSection(SectionManagement section);
    void deleteSection(String section);
}
