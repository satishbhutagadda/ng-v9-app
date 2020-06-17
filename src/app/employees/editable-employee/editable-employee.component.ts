import { Component, OnInit, Output, EventEmitter, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Employee } from '../employees.component';

@Component({
  selector: 'app-editable-employee',
  templateUrl: './editable-employee.component.html',
  styleUrls: ['./editable-employee.component.scss']
})
export class EditableEmployeeComponent implements OnInit, OnChanges {
  @Input() employee: Employee;
  @Output() done = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter();

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initEmpForm();
  }

  ngOnChanges({employee}: SimpleChanges): void{
    if (employee){
      this.handleEmployee(employee);
    }
  }

  private initEmpForm(): void{
    const emp: { [key in keyof Employee] : any } = {
      id: [0],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    };
    this.employeeForm = this.fb.group(emp);
  }

  private handleEmployee(employee: SimpleChange): void{
    setTimeout(() => {
      if (employee.firstChange && this.employeeForm){
        this.setEmpFormValues(employee.currentValue);
      }
    }, 100);
  }

  private setEmpFormValues(employee: Employee): void{
    const {id, first_name, last_name, email} = employee;
    const empObj: Employee = {
      id,
      first_name,
      last_name,
      email
    }
    this.employeeForm.setValue(empObj);
  }

  onAdd(){
    this.done.emit(this.employeeForm.value);
  }
  onCancel(){
    this.cancel.emit();
  }

}
