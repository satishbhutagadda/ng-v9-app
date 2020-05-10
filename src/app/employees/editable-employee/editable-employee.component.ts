import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../employees.component';

@Component({
  selector: 'app-editable-employee',
  templateUrl: './editable-employee.component.html',
  styleUrls: ['./editable-employee.component.scss']
})
export class EditableEmployeeComponent implements OnInit {
  @Output() add = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter();

  employeeForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initEmpForm();
  }

  private initEmpForm(){
    let emp: Employee;
    this.employeeForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onAdd(){
    this.add.emit(this.employeeForm.value);
  }
  onCancel(){
    this.cancel.emit();
  }

}
