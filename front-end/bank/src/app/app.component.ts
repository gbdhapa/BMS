import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userslist:any;
  errorMessage: any;
  baseUrl:any;
  
    constructor(private http: HttpClient) {
       }

    ngOnInit() {     
      
    }
  title = 'bank';
}

