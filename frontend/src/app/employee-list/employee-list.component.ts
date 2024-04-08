// frontend/src/app/employee-list/employee-list.component.ts

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = []; // Initialize the property here
  error: string = ''; // Initialize the error property

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      (response) => {
        this.employees = response; // Assuming the response directly contains the employee data
      },
      (error) => {
        console.error('Error fetching employees:', error);
        this.error = 'Failed to fetch employees. Please try again later.'; // Set error message
      }
    );
  }
}
