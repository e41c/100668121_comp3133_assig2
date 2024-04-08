// frontend/src/app/add-employee/add-employee.component.ts

// add-employee.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service'; // Import EmployeeService
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  addEmployee(): void {
    this.router.navigate(['/add-employee']);
  }
}
