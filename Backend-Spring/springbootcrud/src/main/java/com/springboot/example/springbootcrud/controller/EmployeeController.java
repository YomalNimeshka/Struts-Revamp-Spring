package com.springboot.example.springbootcrud.controller;

import com.springboot.example.springbootcrud.dao.EmployeeDAO;
import com.springboot.example.springbootcrud.entity.Employee;
import com.springboot.example.springbootcrud.service.EmployeeService;
import com.springboot.example.springbootcrud.util.CSVHelper;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/Employees")
public class EmployeeController {

    private EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService theEmployeeService){
        employeeService = theEmployeeService;
    }

    @GetMapping("Employees")
    public List<Employee> findAll(){
        return employeeService.getAll();
    }

    @PostMapping("Login")
    public int loginId(@RequestBody Employee employee){
        int loginVal = employeeService.login(employee);
        return loginVal;
    }

    @PostMapping("AddEmp")
    public void addEmployee(@RequestBody Employee employee){
        employeeService.addEmp(employee);
    }

    @GetMapping("EmpId/{empId}")
    public Employee getEmployeeById(@PathVariable Integer empId){
        Employee emp = employeeService.getEmpWithId(empId);
        return emp;
    }

    @PutMapping("UpdateEmp/{empId}")
    public Employee updateEmployee(@PathVariable Integer empId, @RequestBody Employee employee){
        Employee emp = employeeService.getEmpWithId(empId);
        //System.out.println("emp id" +emp.toString());
        emp.setEmpName(employee.getEmpName());
        emp.setEmpSalary(employee.getEmpSalary());
        emp.setEmpDesignation(employee.getEmpDesignation());
        System.out.println("after changes "+emp.toString());

        employeeService.updateEmp(emp);
        return emp;
    }

    @DeleteMapping("DeleteEmp/{empId}")
    public void deleteEmployee(@PathVariable Integer empId){
        Employee emp = employeeService.getEmpWithId(empId);
        employeeService.deleteEmp(empId);
    }

    @GetMapping("Report/{format}")
    public String generateReport(@PathVariable String format) throws IOException, JRException {
        //System.out.println(format);
        return employeeService.exportReport(format);
    }

    @PostMapping("CSV/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file){
        //System.out.println("Send in file content type " +file.getContentType());
        //if (CSVHelper.hasCSVFormat(file)){
            try{
                employeeService.saveCSV(file);
                return "File uploaded";
            }catch (Exception e){
                return "File couldnt be uploaded";
            }
        //}
        //return "Please upload csv file";
    }
}
