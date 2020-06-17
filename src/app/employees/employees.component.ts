import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from './employees.service';

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private employees: Employee[];
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'actions'];
  defaultDisplayedColumns: string[] = [...this.displayedColumns];
  displayedColumnsforEdit: string[] = ['edit'];
  displayedColumnsforAdd: string[] = ['add'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();

  private editableRowIndex = -1;
  readonly newRowIndex = 0;

  addingEmployee = (index, item: Employee) => this.newRowIndex === item.id;
  editingEmployee = (index, item: Employee) => index === this.editableRowIndex;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  private getAllEmployees(): void {
    this.employeeService.getListOfEmployees().subscribe((employees: Employee[]) => {
      if (typeof employees === 'object') {
        this.employees = employees;
        this.dataSource.data = this.employees;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }


  ngAfterViewInit(): void {
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNewRow(): void {
    const emptyEmployee: Employee = {
      id: 0,
      first_name: null,
      last_name: null,
      email: null
    };
    this.employees.unshift(emptyEmployee);
    this.dataSource.data = this.employees;
    this.displayedColumns = this.defaultDisplayedColumns;
    this.dataSource.filter = '';
  }

  editRow(index: number, employee: Employee): void{
    this.editableRowIndex = index;
    this.displayedColumns = this.defaultDisplayedColumns;
    this.dataSource.filter = '';
  }

  deleteEmployee(employee: Employee, index: number): void{
    if (employee.id === null){
      this.employees.splice(index, 1);
      this.dataSource.data = this.employees;
      this.dataSource.filter = '';
    } else {
      this.employeeService.deleteEmployee(employee.id).subscribe((response: Employee) => {
        if (typeof response === 'object') {
          this.getAllEmployees();
        }
      });
    }
  }

  onAdd(newEmployee: Employee): void{
    const newEmpObj: Employee = {
      ...newEmployee,
      id: null
    };
    this.employees.splice(0, 1, newEmpObj);
    this.dataSource.data = this.employees;
    this.dataSource.filter = '';
  }

  onCancel(newEmployee: Employee): void{
    this.employees.splice(0, 1);
    this.dataSource.data = this.employees;
    this.dataSource.filter = '';
  }

  onEdit(editedEmp: Employee, employee: Employee, index: number): void{
    const empObj: Employee = {
      ...employee,
      ...editedEmp
    };
    this.employeeService.updateEmployee(empObj, employee.id).subscribe((response: Employee) => {
      if (response) {
        console.log(response);
        this.editableRowIndex = -1;
        this.employees.splice(index, 1, response);
        this.dataSource.data = this.employees;
        this.dataSource.filter = '';
      }
    });
  }

  onEditingCancel(): void{
    this.editableRowIndex = -1;
    this.displayedColumns = this.defaultDisplayedColumns;
    this.dataSource.filter = '';
  }
}
