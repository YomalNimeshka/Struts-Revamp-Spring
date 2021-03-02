package com.springboot.example.springbootcrud.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "page_sections_userrolr", schema = "emptable", catalog = "")
public class PageSectionsUserrolr {
    private int id;
    private String page;
    private String section;
    private String userrole;

    @Id  @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "page")
    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }

    @Basic
    @Column(name = "section")
    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    @Basic
    @Column(name = "userrole")
    public String getUserrole() {
        return userrole;
    }

    public void setUserrole(String userrole) {
        this.userrole = userrole;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PageSectionsUserrolr that = (PageSectionsUserrolr) o;
        return id == that.id &&
                Objects.equals(page, that.page) &&
                Objects.equals(section, that.section) &&
                Objects.equals(userrole, that.userrole);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, page, section, userrole);
    }

    @Override
    public String toString() {
        return "PageSectionsUserrolr{" +
                "id=" + id +
                ", page='" + page + '\'' +
                ", section='" + section + '\'' +
                ", userrole='" + userrole + '\'' +
                '}';
    }
}
