package com.springboot.example.springbootcrud.Model.page;

public class Page {
    String title;
    String path;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "Page{" +
                "title='" + title + '\'' +
                ", path='" + path + '\'' +
                '}';
    }
}
