import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from './models/ApiResponse';
import { Todo } from './models/Todo';

// import { TicketRe } from './models/TicketResp';

const reqOptions = {
  headers: {},
};

@Injectable({
  providedIn: 'root',
})
export class RestapiService {
  private baseUrl = 'http://localhost:8084/todo';
  accessToken: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  public createTodo(todo: Todo) {

    return this.httpClient.post<ApiResponse>(`${this.baseUrl}/save`,todo);
  }

  public getAllTodo() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/list`);
  }

  public deleteTodo(todoId: number) {
    return this.httpClient.delete<ApiResponse>(
      `${this.baseUrl}/${todoId}`
    );
  }

}
