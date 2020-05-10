import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppCommonModule } from '../common/modules/app-common.module';

import { EmployeesComponent } from './employees.component';
import { EditableEmployeeComponent } from './editable-employee/editable-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  }
];

@NgModule({
  declarations: [EmployeesComponent, EditableEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppCommonModule
  ]
})
export class EmployeesModule { }
