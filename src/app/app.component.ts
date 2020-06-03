import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

import './_content/app.css';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    public static backendUrl: String = "http://ec2-54-89-195-110.compute-1.amazonaws.com";

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
