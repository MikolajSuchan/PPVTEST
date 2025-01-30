import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProjectComponent } from './components/project/project.component';
import { CompanyComponent } from './components/company/company.component';

export const routes: Routes = [
    {
        path:'employee',component:EmployeeComponent
    },
    {
        path:'project',component:ProjectComponent
    },
    {
        path:'company',component:CompanyComponent
    },
];
