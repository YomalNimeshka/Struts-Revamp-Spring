package com.springboot.example.springbootcrud.dao;

import com.springboot.example.springbootcrud.entity.Employee;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.persistence.EntityManager;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Random;

@Repository
@EnableWebSecurity
public class EmployeeDAOHibImpl implements EmployeeDAO{

    //entity manager
    private EntityManager entityManager;



    public EmployeeDAOHibImpl(EntityManager theEntityManager){
        entityManager = theEntityManager;
    }

    @Override

    public List<Employee> getAll() {
        Session currentSession =entityManager.unwrap(Session.class);
        Query<Employee> theQuery = currentSession.createQuery("from Employee ", Employee.class);
        List<Employee> employees = theQuery.getResultList();
        return employees;
    }

    @Override
    public int login(Employee employee) {
        int dataAvailable=0;
        Session currentSession = entityManager.unwrap(Session.class);

        //Query<Employee> theQuery = currentSession.createQuery("from Employee as e where e.username=:employeeName and e.password=:employeePassword").setString("employeeName", employee.getUsername()).setString("employeePassword", employee.getPassword());
        Query hashedPassword= (currentSession.createQuery("from Employee as e where e.username=:employeeName ").
            setString("employeeName", employee.getUsername()));

        Employee stringHashedPassword =(Employee) hashedPassword.uniqueResult();
        System.out.println("Login----- hashedPassword---"+stringHashedPassword);


        if (BCrypt.checkpw(employee.getPassword(), stringHashedPassword.getPassword())) {
            System.out.println("It matches");
            return dataAvailable = 1;
        }
        else {
            System.out.println("It does not match");
            return dataAvailable = 0;
        }

    }

    @Override
    public void addEmp(Employee employee) {
        Session currentSession = entityManager.unwrap(Session.class);
        //decoding the encoded password from the frontend
        byte[] decodedBytes = Base64.getDecoder().decode(employee.getPassword());
        String decodedString = new String(decodedBytes);


        String passwordHash = BCrypt.hashpw(decodedString, BCrypt.gensalt(12));

        //setting the decoded password tro the db
        employee.setPassword(passwordHash);
        currentSession.saveOrUpdate(employee);
        currentSession.close();
    }

    @Override
    public Employee getEmpWithId(Integer id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Employee theEmployee = currentSession.get(Employee.class, id);
        currentSession.close();
        return theEmployee;
    }

    @Override
    public void updateEmp(Employee employee) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(employee);
        System.out.println("data migt have updated");
        currentSession.close();

    }

    @Override
    public void deleteEmp(Integer id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query theQuery = currentSession.createQuery("delete from Employee where empId=:id");
        theQuery.setParameter("id",id);
        theQuery.executeUpdate();
    }

    @Override
    public void addEmpWithCSV(Employee employee) {
        Session currentSession = entityManager.unwrap(Session.class);




        String passwordHash = BCrypt.hashpw(employee.getPassword(), BCrypt.gensalt(12));

        //setting the decoded password tro the db
        employee.setPassword(passwordHash);
        currentSession.saveOrUpdate(employee);
        currentSession.close();
    }

}
