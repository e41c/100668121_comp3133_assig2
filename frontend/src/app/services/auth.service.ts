// frontend/src/app/services/auth.service.ts

// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post('/api/user/login', credentials);
  }

  signup(userData: { email: string, password: string }): Observable<any> {
    return this.http.post('/api/user/signup', userData);
  }

  // Example method to check if user is logged in
  isLoggedIn(): boolean {
    // Implement your logic here, e.g., check if token is present in local storage
    return localStorage.getItem('token') !== null;
  }

  // Example method to log out user
  logout(): void {
    // Implement your logout logic here, e.g., remove token from local storage
    localStorage.removeItem('token');
  }
}
