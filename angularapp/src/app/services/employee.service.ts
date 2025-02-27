import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  Get(emptyId: number) {
    return this.http.get<Employee>(this.apiUrl + '/' + emptyId);
  }

  Create(data: Employee) {
    return this.http.post(this.apiUrl, data);
  }

  Update(data: Employee) {
    return this.http.put(this.apiUrl + '/' + data.id, data);
  }

  Delete(emptyId: number) {
    return this.http.delete(this.apiUrl + '/' + emptyId);
  }
  
}
