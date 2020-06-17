import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Employee } from './employees.component';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    readonly APIURL = 'http://localhost:3000/employees';
    constructor(
        private http: HttpClient
    ) {}

    getListOfEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.APIURL);
    }

    updateEmployee(employee: Employee, employeeID: number): Observable<Employee> {
        return this.http.put<Employee>(`${this.APIURL}/${employeeID}`, employee);
    }

    deleteEmployee(employeeID: number): Observable<Employee> {
        return this.http.delete<Employee>(`${this.APIURL}/${employeeID}`);
    }
}
