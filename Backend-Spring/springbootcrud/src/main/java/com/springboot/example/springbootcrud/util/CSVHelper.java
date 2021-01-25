package com.springboot.example.springbootcrud.util;

import com.springboot.example.springbootcrud.entity.Employee;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class CSVHelper {
    public static String TYPECSV = "text/csv";
    public static String TYPEExcelCSVxls = "application/vnd.ms-excel";
    public static String TYPEExcelCSVxlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"empName", "empSalary", "empDesignation", "username", "password"};

    public static boolean hasCSVFormat(MultipartFile file) {
        if (!TYPEExcelCSVxls.equals(file.getContentType())) {
            return false;
        }else if (!TYPECSV.equals(file.getContentType())){
            return false;
        }else if(!TYPEExcelCSVxlsx.equals(file.getContentType())){
            return false;
        }
        return true;

    }

    public static List<Employee> csvToEmployees(InputStream inputStream) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {
            List<Employee> employees = new ArrayList<Employee>();
            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords){
                Employee employee = new Employee(
                        csvRecord.get("empName"),
                        Integer.parseInt(csvRecord.get("empSalary")),
                        csvRecord.get("empDesignation"),
                        csvRecord.get("username"),
                        csvRecord.get("password")
                );
                employees.add(employee);
            }
            return employees;
        }catch(IOException e){
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }
}

