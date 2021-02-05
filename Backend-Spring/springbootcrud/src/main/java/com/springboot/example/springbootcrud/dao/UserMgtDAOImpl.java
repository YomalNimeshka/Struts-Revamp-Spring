package com.springboot.example.springbootcrud.dao;

import com.springboot.example.springbootcrud.entity.Employee;
import com.springboot.example.springbootcrud.entity.SectionManagement;
import com.springboot.example.springbootcrud.entity.UserManagement;
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
public class UserMgtDAOImpl implements UserMgtDAO {
    //entity manager
    private EntityManager entityManager;



    public UserMgtDAOImpl(EntityManager theEntityManager){
        entityManager = theEntityManager;
    }
    @Override
    public List<UserManagement> getAll() {
        Session currentSession =entityManager.unwrap(Session.class);
        Query<UserManagement> theQuery = currentSession.createQuery("from UserManagement ", UserManagement.class);
        List<UserManagement> users = theQuery.getResultList();
        return users;
    }

    @Override
    public void addUser(UserManagement user) {
        Session currentSession = entityManager.unwrap(Session.class);
        //decoding the encoded password from the frontend
        byte[] decodedBytes = Base64.getDecoder().decode(user.getPassword());
        String decodedString = new String(decodedBytes);


        String passwordHash = BCrypt.hashpw(decodedString, BCrypt.gensalt(12));

        //setting the decoded password tro the db
        user.setPassword(passwordHash);
        currentSession.saveOrUpdate(user);
        currentSession.close();
    }

    @Override
    public UserManagement getUserWithId(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        UserManagement theUser = currentSession.get(UserManagement.class, id);
        currentSession.close();
        return theUser;
    }

    @Override
    public void updateUser(UserManagement user) {
        Session currentSession = entityManager.unwrap(Session.class);

        currentSession.saveOrUpdate(user);
        System.out.println("data migt have updated");
        currentSession.close();
    }

    @Override
    public void deleteUser(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query theQuery = currentSession.createQuery("delete from UserManagement where employeeId=:id");
        theQuery.setParameter("id",userId);
        theQuery.executeUpdate();
    }
}
