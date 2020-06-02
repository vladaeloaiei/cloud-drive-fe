import { Component } from '@angular/core';
//import { Component } from '@angular/cors';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

import './_content/app.css';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    public static backendUrl: String = "http://192.168.1.141:8081";

    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
