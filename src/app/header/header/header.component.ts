import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../../auth/login/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  constructor(private authService: AuthService) { }

  isLoggedIn;

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('access_token')

  }

  ngDoCheck() {
    this.isLoggedIn = localStorage.getItem('access_token')
  }

  onLogout() {
    this.authService.logout();
  }

}
