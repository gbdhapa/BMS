package com.BankManagement.Bank.service;

import com.BankManagement.Bank.model.account;
import com.BankManagement.Bank.repo.repository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest

public class BankServiceTest {

    @Autowired
    private BankService bms ;
    @MockBean
    private repository repo ;

    private account acc = new account("test","9999999999","address","gulab@gmail.com");

    @Test
    public void addAccountTest() {
        when(repo.save(acc)).thenReturn(acc);
        Assert.assertEquals(acc, bms.addAccount(acc));
    }

    @Test
    public void getAllAccountsTest(){
        when(repo.findAll()).thenReturn(Stream
                .of(    new account( "Gulab","999999999" ,"gulab@gmail.com", "address"),
                        new account( "Gulab","999999999" ,"gulab@gmail.com", "address"),
                        new account( "Gulab","999999999" ,"gulab@gmail.com", "address")
                ).collect(Collectors.toList()));

        assertEquals(3, bms.getAllAccount().size());
    }

    @Test
    public void findByEmailTest(){

       when(repo.findByemail("gulab@gmail.com")).thenReturn(Stream.of(new account("test","9999999999","address","abc@gmail.com")).collect(Collectors.toList()));
       Assert.assertEquals(1,repo.findByemail("gulab@gmail.com").size());
       Assert.assertEquals(0,repo.findByemail("gulab12@gmail.com").size());
       Assert.assertEquals(true,bms.findbyemail("gulab@gmail.com"));
       Assert.assertEquals(false,bms.findbyemail("gulab123@gmail.com"));
    }

    @Test
    public void deleteAccountTest(){
        account acc = new account( "Gulab","999999999" ,"gulab@gmail.com", "address");
        bms.deleteAccount(acc);
        verify(repo, times(1)).delete(acc);
    }

}
