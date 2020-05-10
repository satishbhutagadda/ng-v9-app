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
  private employees: Employee[];

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'actions'];
  defaultDisplayedColumns: string[] = [...this.displayedColumns];
  displayedColumnsforEdit: string[] = ['edit'];
  displayedColumnsforAdd: string[] = ['add'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();

  editableRowIndex = -1;
  newRowIndex = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeService.getListOfEmployees().subscribe((employees: Employee[]) => {
      if (typeof employees === 'object') {
        this.employees = employees;
        this.dataSource.data = this.employees;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  addingEmployee = (index, item: Employee) => this.newRowIndex === item.id;

  editingEmployee = (index, item: Employee) => index === this.editableRowIndex;

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNewRow(): void {
    // this.setNullValue(this.profileForm);
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

  editRow(index, employee: Employee){
    this.editableRowIndex = index;
    this.displayedColumns = this.defaultDisplayedColumns;
    this.dataSource.filter = '';
  }

  deleteRow(index){
    this.employees.splice(index, 1);
    this.dataSource.data = this.employees;
  }

  onAdd(newEmployee: Employee){
    this.employees.splice(0, 0, newEmployee);
    this.dataSource.data = this.employees;
    this.dataSource.filter = '';
  }

  onCancel(newEmployee: Employee){
    this.employees.splice(0, 0, newEmployee);
    this.dataSource.data = this.employees;
    this.dataSource.filter = '';
  }
}
