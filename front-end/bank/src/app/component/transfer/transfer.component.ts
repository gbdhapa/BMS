import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  verifymsg1: string = '';
  verifymsg2: string = '';
  transfermsg: string = '';
  isdisabled1=false;
  isdisabled2=false;
  isdisabled3=false;
  userList: User[] = [];
  accountNo1: string = '';
  accountNo2: string = '';
  temp: User[] = [];
  amount: number = 0;
  flag1: boolean = false;
  flag2: boolean = false;
  time= formatDate(new Date(), 'MMM d, y, h:mm:ss', 'en');


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser() {
    this.userService.getAllUser().subscribe(res => {
      this.userList = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }
  verify1(term: string) {
    this.verifymsg1 = 'User not found !';

    for (let user of this.userList) {
      if (user.accountno == term) { 
        this.flag1 = true; this.temp[0] = user;
         this.verifymsg1 = "User Found ! Balance :  " + this.temp[0].balance; 
         this.isdisabled1=true;
         return this.verifymsg1;
       }
       
    } return this.verifymsg1;
  }
  verify2(term: string) {
    this.verifymsg2 = 'User not found !';
    for (let user of this.userList) {
      if (user.accountno == term) { 
        this.flag2 = true; 
        this.temp[1] = user; 
        this.verifymsg2 = "User Found ! "; 
        this.isdisabled2=true;
        return this.verifymsg2; }
    } return this.verifymsg2;
  }

  transfer() {

    if (this.flag1 && this.flag2 && (Number(this.temp[0].balance) >= Number(this.amount))) {

      let balance1: number = Number(this.temp[0].balance) - Number(this.amount); //Depositor 
      let balance2: number = Number(this.temp[1].balance) + Number(this.amount);

      this.temp[0].balance = balance1.toString();
      this.temp[1].balance = balance2.toString();

      this.temp[0].transactions.push('Time : '+ this.time +' Transaction : ' +this.amount+' Trasferred from account : '+ this.temp[0].accountno+ ' to account : '+ this.temp[1].accountno)

      this.transfermsg = ' Transfer Successfull ! Depositor Balance:  ' + this.temp[0].balance ;
      this.userService.updateUser(this.temp[0]).subscribe(res => {
      }, err => {
        console.log(err);
      })

      this.userService.updateUser(this.temp[1]).subscribe(res => {
      }, err => {
        console.log(err);
      })
      this.isdisabled3=true;
    }else { this.transfermsg = ' Transfer Failed! Insufficient Balance. ' }
  }
    
}
