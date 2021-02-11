package com.springboot.example.springbootcrud.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user_role_management", schema = "emptable", catalog = "")
public class UserRoleManagement {
    private String userRoleCode;
    private String description;
    private String status;
    private String userRoleType;

    @Id
    @Column(name = "user_role_code")
    public String getUserRoleCode() {
        return userRoleCode;
    }

    public void setUserRoleCode(String userRoleCode) {
        this.userRoleCode = userRoleCode;
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
    @Column(name = "status")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Basic
    @Column(name = "user_role_type")
    public String getUserRoleType() {
        return userRoleType;
    }

    public void setUserRoleType(String userRoleType) {
        this.userRoleType = userRoleType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRoleManagement that = (UserRoleManagement) o;
        return Objects.equals(userRoleCode, that.userRoleCode) &&
                Objects.equals(description, that.description) &&
                Objects.equals(status, that.status) &&
                Objects.equals(userRoleType, that.userRoleType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userRoleCode, description, status, userRoleType);
    }
}
