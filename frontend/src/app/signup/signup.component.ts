// frontend/src/app/signup/signup.component.ts
// signup.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router, private authService: AuthService) {}

  signup(email: string, password: string): void {
    this.authService.signup({ email, password }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
