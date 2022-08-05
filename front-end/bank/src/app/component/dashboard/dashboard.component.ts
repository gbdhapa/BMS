import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetail !: FormGroup
  accountDetail !: FormGroup ;
  userObj: User = new User();
  userList: User[] = [];
  contains:  boolean = false;
  isshowdiv:boolean=false;

  errorMessage: any;

  constructor(
    
    private formBuilder: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private loginService:LoginService

  ) {

  }

  ngOnInit(): void {

   // this.getAllUser();

    this.userDetail = this.formBuilder.group({
      name: [''],
      phone: [''],
      email: [''],
      address: [''],
      account: [''],

    });

    this.accountDetail = this.formBuilder.group({
      depositor: [''],
      receiver: [''],
      amount: [''],
    });


  }
  togglenav(){
    this.isshowdiv=!this.isshowdiv;
  }
  addUser() {

    console.log(this.userDetail);
    this.userObj.id = this.userDetail.value.id;
    this.userObj.name = this.userDetail.value.name;
    this.userObj.phoneno = this.userDetail.value.phone;
    this.userObj.email = this.userDetail.value.email;
    this.userObj.address = this.userDetail.value.address;

    this.userService.addUser(this.userObj).subscribe(res => {
      console.log(res);
      this.getAllUser();
    }, err => {
      console.log(err);
    });

  }

  getAllUser() {

    this.userService.getAllUser().subscribe(res => {
      this.userList = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }

  editUser(user: User) {

    //this.userDetail.controls['id'].setValue(user.id);
    //this.userDetail.controls['name'].setValue(user.name);
    this.userDetail.controls['email'].setValue(user.email);
    this.userDetail.controls['phone'].setValue(user.phoneno);
    this.userDetail.controls['address'].setValue(user.address);

  }

  updateUser() {

    //  this.userObj.id = this.userDetail.value.id;
    this.userObj.name = this.userDetail.value.name;
    this.userObj.phoneno = this.userDetail.value.phone;
    this.userObj.email = this.userDetail.value.email;
    this.userObj.address = this.userDetail.value.address;

    this.userService.updateUser(this.userObj).subscribe(res => {
      console.log(res);
      this.getAllUser();
    }, err => {
      console.log(err);
    })

  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(res => {
      console.log(res)
      this.getAllUser();
    }, err => {
      console.log(err);
    });

  }

  logOut(){
    this.loginService.logOut();
  }


}