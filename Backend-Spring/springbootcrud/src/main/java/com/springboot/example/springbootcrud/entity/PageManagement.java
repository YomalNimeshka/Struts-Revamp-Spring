package com.springboot.example.springbootcrud.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "page_management", schema = "emptable", catalog = "")
public class PageManagement {
    private String pageCode;
    private String description;
    private String url;
    private int sortKey;
    private String status;
    private String dualAuth;
    private String remarks;

    @Id
    @Column(name = "page_code")
    public String getPageCode() {
        return pageCode;
    }

    public void setPageCode(String pageCode) {
        this.pageCode = pageCode;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "url")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Basic
    @Column(name = "sort_key")
    public int getSortKey() {
        return sortKey;
    }

    public void setSortKey(int sortKey) {
        this.sortKey = sortKey;
    }

    @Basic
    @Column(name = "status")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Basic
    @Column(name = "dual_auth")
    public String getDualAuth() {
        return dualAuth;
    }

    public void setDualAuth(String dualAuth) {
        this.dualAuth = dualAuth;
    }

    @Basic
    @Column(name = "remarks")
    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PageManagement that = (PageManagement) o;
        return sortKey == that.sortKey &&
                Objects.equals(pageCode, that.pageCode) &&
                Objects.equals(description, that.description) &&
                Objects.equals(url, that.url) &&
                Objects.equals(status, that.status) &&
                Objects.equals(dualAuth, that.dualAuth) &&
                Objects.equals(remarks, that.remarks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pageCode, description, url, sortKey, status, dualAuth, remarks);
    }
}
