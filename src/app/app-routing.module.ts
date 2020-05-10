import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'employees', loadChildren: () => {
      return import('./employees/employees.module').then((module) => module.EmployeesModule);
    }
  },
  {path: 'clients', loadChildren: () => {
    return import('./clients/clients.module').then((module) => module.ClientsModule);
  }
},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
