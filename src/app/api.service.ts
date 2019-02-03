import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1";

  constructor(private readonly httpClient: HttpClient) { }

  get(entityName: string): Observable<any> {
    const apiEndpoint = `${this.API_URL}/${entityName}`;
    return this.httpClient.get(apiEndpoint);
  }

  getDetail(entityName: string, id: string): Observable<any> {
    const apiEndpoint = `${this.API_URL}/${entityName}/${id}`;
    return this.httpClient.get(apiEndpoint);
  }

  delete(entityName: string, id: string): Observable<any> {
    const apiEndpoint = `${this.API_URL}/${entityName}/${id}`;
    return this.httpClient.delete(apiEndpoint);
  }
}
