package com.springboot.example.springbootcrud.Model.PageSectionUser;

import java.util.ArrayList;

public class PageSectionUserModel {
    String UserType;
    String SectionCode;
    ArrayList pageList = new ArrayList();

    public PageSectionUserModel(String userType, String sectionCode, ArrayList pageList) {
        UserType = userType;
        SectionCode = sectionCode;
        this.pageList = pageList;
    }

    public String getUserType() {
        return UserType;
    }

    public void setUserType(String userType) {
        UserType = userType;
    }

    public String getSectionCode() {
        return SectionCode;
    }

    public void setSectionCode(String sectionCode) {
        SectionCode = sectionCode;
    }

    public ArrayList getPageList() {
        return pageList;
    }

    public void setPageList(ArrayList pageList) {
        this.pageList = pageList;
    }

    @Override
    public String toString() {
        return "PageSectionUserModel{" +
                "UserType='" + UserType + '\'' +
                ", SectionCode='" + SectionCode + '\'' +
                ", pageList=" + pageList +
                '}';
    }
}
