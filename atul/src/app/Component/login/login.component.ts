import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/Model/login';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login;
  FixedUsername: string;
  FixedPassword: string;

  constructor(private router: Router) {
    this.login = new Login();
  }

  ngOnInit() {
    //Hard coded value of username and password
    this.FixedUsername = 'blogger@grapecity.com';
    this.FixedPassword = '1qaz!QAZ'
  }
  //Login button
  Login() {
    if (this.login.username == "" || this.login.password == "") {
      alert('Username or Password Cannot be blank');
    }
    else if (this.login.username == this.FixedUsername && this.login.password == this.FixedPassword) {
      this.router.navigate(['/home']); // to route to home page
    }
  }

}
