import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/Project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiUrl = 'http://localhost:3000/project';

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Project[]>(this.apiUrl);
  }

  Get(projectId: number) {
    return this.http.get<Project>(this.apiUrl + '/' + projectId);
  }

  Create(data: Project) {
    return this.http.post(this.apiUrl, data);
  }

  Update(data: Project) {
    return this.http.put(this.apiUrl + '/' + data.id, data);
  }

  Delete(projectId: number) {
    return this.http.delete(this.apiUrl + '/' + projectId);
  }
}
