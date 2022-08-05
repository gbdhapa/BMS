import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-viewbalance',
  templateUrl: './viewbalance.component.html',
  styleUrls: ['./viewbalance.component.css']
})
export class ViewbalanceComponent implements OnInit {

  userObj: User = new User();
  userList: User[] = [];
  filtered: User[] = [];
  users$!: Observable<User[]>;

  private searchTerms = new Subject<string>();
  constructor(
    private userService: UserService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  accountNo: string = '';
  msg:string='';
  getAllUser() {
    this.userService.getAllUser().subscribe(res => {
      this.userList = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }

  Search(term: string) {
    this.msg ='User not found !';
    for (let user of this.userList) {
      if (user.accountno == term ) { return this.msg = 'Balance : '+user.balance }
    } return this.msg;
  }

}
