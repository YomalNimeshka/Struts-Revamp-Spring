package com.springboot.example.springbootcrud.service;

import com.springboot.example.springbootcrud.dao.EmployeeDAO;
import com.springboot.example.springbootcrud.entity.Employee;
import com.springboot.example.springbootcrud.util.CSVHelper;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRCsvExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleWriterExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeDAO employeeDAO;

    @Autowired
    public EmployeeServiceImpl(EmployeeDAO theEmployeeDao){
        employeeDAO = theEmployeeDao;
    }

    @Override
    @Transactional
    public List<Employee> getAll() {
        return employeeDAO.getAll();
    }

    @Override
    @Transactional
    public int login(Employee employee) {
        return employeeDAO.login(employee);
    }

    @Override
    @Transactional
    public void addEmp(Employee employee) {
        employeeDAO.addEmp(employee);
    }

    @Override
    @Transactional
    public Employee getEmpWithId(Integer id) {
        return employeeDAO.getEmpWithId(id);
    }

    @Override
    @Transactional
    public void updateEmp(Employee employee) {
        employeeDAO.updateEmp(employee);
    }

    @Override
    @Transactional
    public void deleteEmp(Integer id) {
        employeeDAO.deleteEmp(id);
    }

    @Override
    public String exportReport(String format) throws IOException, JRException {
        HttpServletResponse response = null;
        String downloadPath = "C:\\Users\\yomal_m\\Downloads";
        //load the file and compile it
        File file = ResourceUtils.getFile("classpath:employeeReport.jrxml");
        JasperReport jasperreport = JasperCompileManager.compileReport(file.getAbsolutePath());
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(employeeDAO.getAll());
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("madeBy","dev");
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperreport,parameters,dataSource);

        //if parameter is set to be pdf
        if(format.equalsIgnoreCase("pdf")){
            JasperExportManager.exportReportToPdfFile(jasperPrint, downloadPath+"\\EmployeeReportPDF.pdf");
        }
        //if parameter is set to excel
        if(format.equalsIgnoreCase("excel")){
            JRXlsxExporter exporter = new JRXlsxExporter();


            exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            exporter.setExporterOutput(
                    new SimpleOutputStreamExporterOutput(downloadPath+"\\EmployeeReportExcel.xls"));
            SimpleXlsxReportConfiguration reportConfig
                    = new SimpleXlsxReportConfiguration();
            reportConfig.setSheetNames(new String[] { "Employee Data" });

            exporter.setConfiguration(reportConfig);
            exporter.exportReport();
        }
        //if parameter is set to be csv
        if(format.equalsIgnoreCase("csv")){
            JRCsvExporter exporter = new JRCsvExporter();


            exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            exporter.setExporterOutput(
                    new SimpleWriterExporterOutput(downloadPath+"\\EmployeeReportCSV.csv"));

            exporter.exportReport();
        }

        return "report generated in "+downloadPath;
    }

    @Override
    @Transactional
    public void saveCSV(MultipartFile file) {
        try{
            List<Employee> employees =  CSVHelper.csvToEmployees(file.getInputStream());
            //save to db
            for (Employee employee : employees) {
                employeeDAO.addEmpWithCSV(employee);
                System.out.println("Empl" +employee);
            }

        }catch (IOException e){
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }


}
