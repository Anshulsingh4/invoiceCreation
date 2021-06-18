import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedinUser;
    isLoggedIn = false;
    constructor(private http: HttpClient, private router: Router) { }

    loginData(loginData) {
        return this.http.post('http://localhost:4000/login', loginData)
            .pipe(
                map(result => {
                    if (result['data'] === true) {
                        console.log(result)
                        this.loggedinUser = result['user']
                        localStorage.setItem('access_token', result['token'])
                        this.isLoggedIn = !this.isLoggedIn;
                        return true;
                    }
                    else {
                        alert(result['message'])
                    }
                })
            )

    }



    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.isLoggedIn);
                }, 800);
            }
        );
        return promise;
    }

    logout() {
        localStorage.removeItem('access_token');
        this.isLoggedIn = false; //!this.isLoggedIn;
        this.router.navigate([''])
        alert("You are logged out !")
    }

    public get loggedIn(): boolean {
        return (localStorage.getItem('access_token') !== null);
    }

}