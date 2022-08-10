package com.BankManagement.Bank.service;

import com.BankManagement.Bank.model.account;
import com.BankManagement.Bank.repo.repository;
import com.google.i18n.phonenumbers.NumberParseException;
import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.Phonenumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class BankService {

    private repository repo;

    @Autowired
    public BankService(repository repo) {this.repo = repo;}

//    @Autowired
//    public BankService bms;

    public account addAccount(account acc) {
        String email = acc.getEmail();

        long a;

        while (true) {
            a = generateRandom(12);

            List<account> list = repo.findByaccountno(String.valueOf(a));
            if (list.size() == 0)
                break;
        }
        acc.setAccountno(String.valueOf(a));

        acc.setBalance(0);
        System.out.println("Added account " + acc.getName());
        return this.repo.save(acc);
    }

    public List<account> getAllAccount() {

        List<account> accounts = repo.findAll();
        System.out.println("Getting data from DB : " + accounts);
        return accounts;
    }

    public account updateAccount(String id, account acc) {

        List<account> list = repo.findByid(id);
        account account = list.get(0);
        account.setName(acc.getName());
        account.setAddress(acc.getAddress());
        account.setEmail(acc.getEmail());
        account.setPhoneno(acc.getPhoneno());
        account.setBalance(acc.getBalance());
        account.setTransactions(acc.getTransactions());
        repo.save(account);
        System.out.println("Updated "+ acc.getName());
        return account;
    }

    public void deleteAccount(account acc) {

        repo.delete(acc);
        System.out.println("Deleted " + acc.getName());

    }

    public boolean findbyemail(String email) {

        List<account> list1 = repo.findByemail(email);

        if (list1.size() == 0) {
            System.out.println("Got no user related email " + email);
            return false;
        } else {
            System.out.println("Got user related email " + email);
            return true;
        }
    }

    public boolean findbyemail(String email, String id) {
        List<account> list1 = repo.findByemail(email);

        if (list1.size() == 0)
            return true;
        if (list1.get(0).getId().equals(id))
            return true;

        return false;
    }

    public boolean validatePhoneno(String phoneno) {
        PhoneNumberUtil phoneNumberUtil = PhoneNumberUtil.getInstance();
        Phonenumber.PhoneNumber phoneNumber = null;
        try {
            phoneNumber = phoneNumberUtil.parse(phoneno, "IN");
        } catch (NumberParseException e) {
            e.printStackTrace();
        }
        System.out.println("Is Valid "+ phoneNumberUtil.isValidNumber(phoneNumber));
        return phoneNumberUtil.isValidNumber(phoneNumber);
    }

    public boolean isNumeric(String strNum) {
        if (strNum == null) {
            return false;
        }
        try {
            double d = Double.parseDouble(strNum);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }

    public long generateRandom(int length) {
        Random random = new Random();
        char[] digits = new char[length];
        digits[0] = (char) (random.nextInt(9) + '1');
        for (int i = 1; i < length; i++) {
            digits[i] = (char) (random.nextInt(10) + '0');
        }
        return Long.parseLong(new String(digits));
    }

}
