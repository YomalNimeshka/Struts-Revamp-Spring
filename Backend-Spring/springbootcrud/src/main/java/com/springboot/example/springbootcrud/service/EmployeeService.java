package com.springboot.example.springbootcrud.service;

import com.springboot.example.springbootcrud.entity.Employee;
import net.sf.jasperreports.engine.JRException;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

public interface EmployeeService {
    List<Employee> getAll();
    int login(Employee employee);
    void addEmp(Employee employee);
    Employee getEmpWithId(Integer id);
    void updateEmp(Employee employee);
    void deleteEmp(Integer id);
    String exportReport(String format) throws IOException, JRException;

    void saveCSV(MultipartFile file);

}
