import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import{provideToastr} from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { employeeReducer } from './store/employee/employee.Reducer';
import { emptyEffects } from './store/employee/employee.Effects';
import { projectReducer } from './store/project/project.Reducer';
import { ProjectEffects } from './store/project/project.Effects';
import { companyReducer } from './store/company/company.Reducer';
import { CompanyEffects } from './store/company/company.Effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), provideToastr(), provideStore({'emp':employeeReducer,'project':projectReducer,'company':companyReducer}), provideEffects([emptyEffects,ProjectEffects,CompanyEffects]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
