package com.BankManagement.Bank.controller;
import com.BankManagement.Bank.model.account;
import com.BankManagement.Bank.service.BankService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/account")
public class BankController {

    private final BankService bankService;
    private String id;
    private double amount;

    public BankController(BankService bankService)
    {
        this.bankService = bankService ;
    }
    @GetMapping("/all")


    public ResponseEntity<List<account>> getAllAccount()
    {
        List <account> accounts = bankService.getAllAccount();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<account> addAccount(@Valid @RequestBody account account )
    {
        if (!bankService.isNumeric(account.getPhoneno()))
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Enter correct Phone Number");
            if(!bankService.validatePhoneno(account.getPhoneno()))
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Enter correct Phone Number");


        if(! bankService.findbyemail(account.getEmail())) {
            account newaccount = bankService.addAccount(account);
            return new ResponseEntity<>(newaccount, HttpStatus.CREATED);
        }
        else

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Account already exist");


    }


   @PutMapping("/update/{id}")
    public ResponseEntity<account> updateAccount(@PathVariable("id") String id,@Valid @RequestBody account account ) {

       if (!bankService.isNumeric(account.getPhoneno()))
           throw new ResponseStatusException(
                   HttpStatus.BAD_REQUEST, "Enter correct Phone Number");
       if(!bankService.validatePhoneno(account.getPhoneno()))
           throw new ResponseStatusException(
                   HttpStatus.BAD_REQUEST, "Enter correct Phone Number");
       if (bankService.findbyemail(account.getEmail(), id)) {
           account updateaccount = bankService.updateAccount(id,account);
           return new ResponseEntity<>(updateaccount, HttpStatus.OK);
       } else
           throw new ResponseStatusException(
                   HttpStatus.BAD_REQUEST, "Email already exist");
    }

    @DeleteMapping ("/delete/{id}")
    public ResponseEntity<?>deleteAccount (@Valid @RequestBody account account )
    {
        bankService.deleteAccount(account);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
