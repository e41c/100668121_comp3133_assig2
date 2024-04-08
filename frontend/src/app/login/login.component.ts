// frontend/src/app/login/login.component.ts
// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  login(email: string, password: string): void {
    this.authService.login({ email, password }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
