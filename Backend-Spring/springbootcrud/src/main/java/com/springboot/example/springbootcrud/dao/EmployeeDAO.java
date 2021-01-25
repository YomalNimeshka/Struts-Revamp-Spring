package com.springboot.example.springbootcrud.dao;

import com.springboot.example.springbootcrud.entity.Employee;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface EmployeeDAO {

     List<Employee> getAll();
     int login(Employee employee);
     void addEmp(Employee employee);
     Employee getEmpWithId(Integer id);
     void updateEmp(Employee employee);
     void deleteEmp(Integer id);
     void addEmpWithCSV(Employee employee);
}
