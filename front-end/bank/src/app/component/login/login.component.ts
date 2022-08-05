import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    username: '',
    password: ''
  }
  msg:string='';

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    
    if ((this.credentials.username == '' && this.credentials.password != '') || (this.credentials.username != null && this.credentials.password != null)) {
          this.loginService.generateToken(this.credentials).subscribe(
            (res:any)=>{

                this.loginService.loginUser(res.token);
                console.log('token');
                window.location.href='/home'
            },err=>{
              this.msg='Incorrect Credentials !';
                console.log("Incorrect Credentials !");
            }
          )

    }
    else{ console.log('Fields are empty !!')}
  }

}