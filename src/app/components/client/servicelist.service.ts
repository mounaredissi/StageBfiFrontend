import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { Service } from '../../model/services.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceListService {

  // private apiURL = "http://192.168.205.182:8080";
  private apiKey = "key";

 //private apiURL = "https://89b65388-f55c-4a4b-98ee-8a534e3a8ea4.mock.pstmn.io";
 private apiURL =  "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Accept": "application/json",
      // "X-API-KEY": this.apiKey
    })
  }

  constructor(private httpClient: HttpClient) {}

  loadServices(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/data/services`, this.httpOptions)
  }

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
