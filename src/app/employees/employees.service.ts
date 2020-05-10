import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Employee } from './employees.component';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    listOfEmployees = new Subject<any[]>();
    // employees = this.listOfEmployees.asObservable();
    employees: any[] = [];

    constructor(
        private http: HttpClient
    ) {
        this.getListOfEmployees();
    }

    get getEmployees() {
        return this.employees;
    }

    getListOfEmployees() {
        const URL = 'http://localhost:3000/employees';
        return this.http.get<Employee[]>(URL);
    }
}
