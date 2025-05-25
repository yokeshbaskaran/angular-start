import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Todo {
  _id?: string
  title?: string
  completed?: boolean
}

@Injectable({
  providedIn: 'root'
})


export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl)
  }

  addTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { title });
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
