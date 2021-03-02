import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  /** POST: add a new hero to the database */
  saveQuestion(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/saveAll', data);
  }
}
