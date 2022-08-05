import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  userList: User[] = [];
  temp: string[] = [];
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.getAllUser();

  }
  getAllUser() {
    this.userService.getAllUser().subscribe(res => {
      this.userList = res;
      this.sortList();
    }, err => {
      console.log("error while fetching data.")
    });
  }

  sortList() {
      for (let user of this.userList) {
        for (let s of user.transactions) {
          if (s) {
            this.temp.push(s);
          }
        }
      } this.temp.sort();
    
      this.temp.reverse();
  }




}
