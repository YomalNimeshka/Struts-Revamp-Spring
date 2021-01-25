package com.springboot.example.springbootcrud.entity;

import javax.persistence.*;

@Entity
@Table(name = "emp")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_id")
    private int empId;
    @Column(name = "emp_name")
    private String empName;
    @Column(name = "emp_salary")
    private int empSalary;
    @Column(name = "emp_designation")
    private String empDesignation;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;



    public Employee() {
    }

    public Employee(String empName, int empSalary, String empDesignation, String username, String password) {
        this.empName = empName;
        this.empSalary = empSalary;
        this.empDesignation = empDesignation;
        this.username = username;
        this.password = password;
    }

    public Employee(String empName, int empSalary, String empDesignation) {
        this.empName = empName;
        this.empSalary = empSalary;
        this.empDesignation = empDesignation;
    }

    public Employee(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public int getEmpId() {
        return empId;
    }

    public void setEmpId(int empId) {
        this.empId = empId;
    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public int getEmpSalary() {
        return empSalary;
    }

    public void setEmpSalary(int empSalary) {
        this.empSalary = empSalary;
    }

    public String getEmpDesignation() {
        return empDesignation;
    }

    public void setEmpDesignation(String empDesignation) {
        this.empDesignation = empDesignation;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "empId=" + empId +
                ", empName='" + empName + '\'' +
                ", empSalary=" + empSalary +
                ", empDesignation='" + empDesignation + '\'' +
                '}';
    }
}
