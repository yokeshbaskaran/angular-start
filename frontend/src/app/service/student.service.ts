import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// interface
export interface StudentData {
  name: String
  address: String
  phone: String
}

@Injectable({
  providedIn: 'root'
})


export class StudentService {
  private apiUrl = environment.apiUrl2;

  constructor(private http: HttpClient) { }

  getDatas(): Observable<StudentData[]> {
    return this.http.get<StudentData[]>(this.apiUrl)
  }

  addData(data: StudentData): Observable<StudentData> {
    return this.http.post<StudentData>(this.apiUrl, {
      name: data.name,
      address: data.address,
      phone: data.phone,
    })
  }
}
