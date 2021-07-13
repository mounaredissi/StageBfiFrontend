import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { Inscription, InscriptionResponse } from '../../model/inscription.model';


@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiURL = "https://d77b0c71-ae36-4fc6-a75b-d2d6adf42754.mock.pstmn.io";
  private localApiURL = "http://localhost:4200/data/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Accept": "application/json",
      // "X-API-KEY": this.apiKey
    })
  }

  constructor(private httpClient: HttpClient) {}

  create(inscription: Inscription): Observable<InscriptionResponse> {
    return this.httpClient.post<InscriptionResponse>(`${this.apiURL}/data/clients/00000/user/subscription`, inscription, this.httpOptions)
  }
  getEmbaddedServiceData(){
    return this.httpClient.get(this.localApiURL+'service.json');
  }
  getEmbaddeDocumentData(){
    return this.httpClient.get(this.localApiURL+'document.json');
  }
}
