import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
// import { Observable, throwError, catch } from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { doc } from '../../model/doc.model';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class subscriptiondocService {

  // private apiURL = "http://192.168.205.182:8080";
  private apiKey = "key";

 // private apiURL = "https://4a007c51-8023-475c-a03f-3ad732f5eef2.mock.pstmn.io";
 private apiURL =  "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Accept": "application/json",
      // "X-API-KEY": this.apiKey
    })
  }

  constructor(private httpClient: HttpClient) {}

  loadServicess(): Observable<doc[]> {
    return this.httpClient.get<doc[]>(`${this.apiURL}/data/document`, this.httpOptions)
  }
  getEmbaddedServiceData(){
    return this.httpClient.get('http://localhost:4200/data/document');
  }


  // method2(): Observable<RespObject> {
  //   return this.httpClient.post<RespObject>(`${this.apiURL}/data/services`, this.httpOptions)
  // }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
