import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  private readonly API = 'api/courses';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API);
  }

  getById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }


  update(course: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${course.id}`, course);
  }

  create(course: Partial<Course>): Observable<Course[]> {
    return this.httpClient.post<Course[]>(this.API, course);
  }

}
