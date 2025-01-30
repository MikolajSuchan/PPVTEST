import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    apiUrl = 'http://localhost:3000/company';

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Company[]>(this.apiUrl);
  }

  Get(companyId: number) {
    return this.http.get<Company>(this.apiUrl + '/' + companyId);
  }

  Create(data: Company) {
    return this.http.post(this.apiUrl, data);
  }

  Update(data: Company) {
    return this.http.put(this.apiUrl + '/' + Number(data.id), data);
  }

  Delete(companyId: number) {
    return this.http.delete(this.apiUrl + '/' + Number(companyId));
  }
}
