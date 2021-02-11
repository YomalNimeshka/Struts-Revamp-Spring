package com.springboot.example.springbootcrud.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user_management", schema = "emptable", catalog = "")
public class UserManagement {
    private String username;
    private int employeeId;
    private String fullName;
    private String userRole;
    private String userRoleDescription;
    private String email;
    private String status;
    private String password;

    @Basic
    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Id
    @Column(name = "employee_id")
    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    @Basic
    @Column(name = "full_name")
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @Basic
    @Column(name = "user_role")
    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    @Basic
    @Column(name = "user_role_description")
    public String getUserRoleDescription() {
        return userRoleDescription;
    }

    public void setUserRoleDescription(String userRoleDescription) {
        this.userRoleDescription = userRoleDescription;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserManagement that = (UserManagement) o;
        return employeeId == that.employeeId &&
                Objects.equals(username, that.username) &&
                Objects.equals(fullName, that.fullName) &&
                Objects.equals(userRole, that.userRole) &&
                Objects.equals(userRoleDescription, that.userRoleDescription) &&
                Objects.equals(email, that.email) &&
                Objects.equals(status, that.status) &&
                Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, employeeId, fullName, userRole, userRoleDescription, email, status, password);
    }
}
