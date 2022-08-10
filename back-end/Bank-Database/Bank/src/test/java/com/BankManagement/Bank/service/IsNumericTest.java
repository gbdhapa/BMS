package com.BankManagement.Bank.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class IsNumericTest {

    private BankService bms ;

    @Test
    void isNumerictest(){

        assertEquals(true,bms.isNumeric("9999999999"));
        assertEquals(false,bms.isNumeric("www444"));
        assertEquals(false,bms.isNumeric("qq"));
        assertEquals(false,bms.isNumeric(""));

    }

}
