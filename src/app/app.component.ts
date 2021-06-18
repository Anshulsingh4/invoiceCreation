import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/login/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'Project';
  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    // this.isLoggedIn = this.authService.isLoggedIn
  }

}

