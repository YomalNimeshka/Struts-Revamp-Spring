package com.springboot.example.springbootcrud.dao;

import com.springboot.example.springbootcrud.entity.Employee;
import com.springboot.example.springbootcrud.entity.SectionManagement;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Base64;
import java.util.List;

@Repository
@EnableWebSecurity
public class SectionMgtDAOImpl implements SectionMgtDAO  {

    //entity manager
    private EntityManager entityManager;



    public SectionMgtDAOImpl(EntityManager theEntityManager){
        entityManager = theEntityManager;
    }

    @Override
    public List<SectionManagement> getAll() {
        Session currentSession =entityManager.unwrap(Session.class);
        Query<SectionManagement> theQuery = currentSession.createQuery("from SectionManagement ", SectionManagement.class);
        List<SectionManagement> sections = theQuery.getResultList();
        return sections;
    }

    @Override
    public void addSection(SectionManagement section) {
        Session currentSession = entityManager.unwrap(Session.class);

        currentSession.saveOrUpdate(section);
        currentSession.close();
    }

    @Override
    public SectionManagement getSectionWithCode(String code) {
        Session currentSession = entityManager.unwrap(Session.class);
        SectionManagement theSection = currentSession.get(SectionManagement.class, code);
        currentSession.close();
        return theSection;
    }

    @Override
    public void updateSection(SectionManagement section) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(section);
        System.out.println("data migt have updated");
        currentSession.close();
    }

    @Override
    public void deleteSection(String section) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query theQuery = currentSession.createQuery("delete from SectionManagement where sectionCode=:sectionCode");
        theQuery.setParameter("sectionCode",section);
        theQuery.executeUpdate();
    }
}
