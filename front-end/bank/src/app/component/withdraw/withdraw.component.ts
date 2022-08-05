
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  isDisabled = false;
  isDisabled1 = false;
  verifymsg: string = '';
  withdrawmsg:string='';
  userList: User[] = [];
  accountNo: string = '';
  temp: User[] = [];
  amount: number = 0;
  flag: boolean = false;
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
  verify(term: string) {
    this.verifymsg = 'User not found !';
    for (let user of this.userList) {
      if (user.accountno == term) { 
        this.flag = true; 
        this.temp[0] = user; this.verifymsg ='User Found ! Available Balance : '+ user.balance; 
        this.isDisabled1=true;
        return this.verifymsg; 
      }
    } return this.verifymsg;
  }

  withdraw() {

    if (this.flag && (Number(this.temp[0].balance)>= Number(this.amount))) {
     let balance:number = Number(this.temp[0].balance) - Number(this.amount);  
     this.temp[0].balance = balance.toString();  
     this.temp[0].transactions.push('Time : '+ this.time +' Transaction : ' +this.amount+'  withdrawed from account : '+ this.temp[0].accountno)
     this.withdrawmsg = ' withdraw Successfull ! New Balance : '+ this.temp[0].balance;
      this.userService.updateUser(this.temp[0]).subscribe(res => {
        this.getAllUser();
      }, err => {
        console.log(err);
      })
      this.isDisabled=true;
    }
    else{this.withdrawmsg = ' Insufficient Balance ! '} 
    
  }





}
