import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { AppComponent } from '../app.component';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(AppComponent.backendUrl + `/users`);
    }

    register(user: User) {
        return this.http.post(AppComponent.backendUrl + `/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(AppComponent.backendUrl + `/users/${id}`);
    }
}