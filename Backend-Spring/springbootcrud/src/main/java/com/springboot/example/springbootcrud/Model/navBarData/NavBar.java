package com.springboot.example.springbootcrud.Model.navBarData;

import com.springboot.example.springbootcrud.Model.page.Page;

import java.util.ArrayList;
import java.util.List;

public class NavBar {
    String title;
    String Path;
    List<Page> subNav = new ArrayList<Page>();


    public NavBar(String title, String path, List<Page> subNav) {
        this.title = title;
        Path = path;
        this.subNav = subNav;
    }

    public List<Page> getSubNav() {
        return subNav;
    }

    public void setSubNav(List<Page> subNav) {
        this.subNav = subNav;
    }

    public NavBar() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPath() {
        return Path;
    }

    public void setPath(String path) {
        Path = path;
    }

    @Override
    public String toString() {
        return "NavBar{" +
                "title='" + title + '\'' +
                ", Path='" + Path + '\'' +
                ", subNav=" + subNav +
                '}';
    }
}
