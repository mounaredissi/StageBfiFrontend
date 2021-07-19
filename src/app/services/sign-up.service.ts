import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const baseUrl =
  '192.168.205.165:8081/BanqueDigitaleRDC/api/services/data/clients/00000/';
const baseUrlEmbadded = 'http://localhost:4200/assets/data/';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // "X-API-KEY": this.apiKey
    }),
  };
  constructor(private http: HttpClient) {}
  getAllServicesList(): Observable<Object[]> {
    return this.http.get<Object[]>(baseUrlEmbadded + 'service.json');
  }
  getAllDocumentList(): Observable<Object[]> {
    return this.http.get<Object[]>(baseUrlEmbadded + 'document.json');
  }
  create(inscription: object): Observable<object> {
    return this.http.post<object>(
      baseUrlEmbadded,
      inscription,
      this.httpOptions
    );
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
