package com.BankManagement.Bank.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ValidatePhoneno {


    private BankService bms ;

    @Test
    void validatePhoneno(){

        assertEquals(true,bms.validatePhoneno("8645395421"));
        assertEquals(false,bms.validatePhoneno("0999999999"));
        assertEquals(false,bms.validatePhoneno("9999999"));
        assertEquals(true,bms.validatePhoneno("1234567890"));
        assertEquals(true,bms.validatePhoneno("9999999999"));
    }

}
