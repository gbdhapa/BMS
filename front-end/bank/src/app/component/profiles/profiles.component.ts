import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  
  userDetail !: FormGroup;
  editDetail !: FormGroup;
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

  ) {

  }

  ngOnInit(): void {

    this.getAllUser();

    this.userDetail = this.formBuilder.group({
      name: [''],
      phone: [''],
      email: [''],
      address: [''],
      account: [''],
    });
    this.editDetail = this.formBuilder.group({
      id:[''],
      name: [''],
      phone: [''],
      email: [''],
      address: [''],
      account: [''],
      balance: [''],
      transactions:['']
    });

  }


  togglenav(){
    this.isshowdiv=!this.isshowdiv;
  }
  addUser() {

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
   
    this.editDetail.controls['id'].setValue(user.id);
    this.editDetail.controls['name'].setValue(user.name);
    this.editDetail.controls['email'].setValue(user.email);
    this.editDetail.controls['phone'].setValue(user.phoneno);
    this.editDetail.controls['address'].setValue(user.address);
    this.editDetail.controls['balance'].setValue(user.balance);
    this.editDetail.controls['transactions'].setValue(user.transactions);
  }

  updateUser() {

    this.userObj.id =this.editDetail.value.id;
    this.userObj.name = this.editDetail.value.name;
    this.userObj.phoneno = this.editDetail.value.phone;
    this.userObj.email = this.editDetail.value.email;
    this.userObj.address = this.editDetail.value.address;
    this.userObj.balance = this.editDetail.value.balance;
    this.userObj.transactions = this.editDetail.value.transactions;
    
  
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

  


}
