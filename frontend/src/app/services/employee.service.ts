import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.post('/graphql', {
      query: `
        {
          employees {
            id
            name
            email
            department
          }
        }
      `
    });
  }

  addEmployee(name: string, email: string, department: string): Observable<any> {
    return this.http.post('/graphql', {
      query: `
        mutation {
          addEmployee(name: "${name}", email: "${email}", department: "${department}") {
            id
            name
            email
            department
          }
        }
      `
    });
  }

  updateEmployee(id: string, name: string, email: string, department: string): Observable<any> {
    return this.http.post('/graphql', {
      query: `
        mutation {
          updateEmployee(id: "${id}", name: "${name}", email: "${email}", department: "${department}") {
            id
            name
            email
            department
          }
        }
      `
    });
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.post('/graphql', {
      query: `
        mutation {
          deleteEmployee(id: "${id}")
        }
      `
    });
  }
}
