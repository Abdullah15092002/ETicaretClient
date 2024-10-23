import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }


  private url(requestParam: Partial<RequestParameters>): string {
    return `${requestParam.baseUrl ? requestParam.baseUrl : this.baseUrl}
               /${requestParam.controller} 
                ${requestParam.action ? `/${requestParam.action}` : ""}`.replace(/\s/g, '');
  }

  get<T>(requestParam: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = "";
    if (requestParam.fullEndPoint)
      url = requestParam.fullEndPoint
    else
      url = `${this.url(requestParam)}${id ? `/${id}` : ""}${requestParam.queryString ?`?${requestParam.queryString}`:""}`;
    return this.httpClient.get<T>(url, { headers: requestParam.headers })
  }

  post<T>(requestParam: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParam.fullEndPoint)
      url = requestParam.fullEndPoint
    else
      url = `${this.url(requestParam)}`;
    return this.httpClient.post<T>(url, body, { headers: requestParam.headers });
  }

  put<T>(requestParam: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParam.fullEndPoint)
      url = requestParam.fullEndPoint;
    else
      url = `${this.url(requestParam)}`;
    return this.httpClient.put<T>(url, body, { headers: requestParam.headers })
  }

  delete<T>(requestParam: Partial<RequestParameters>, id: string): Observable<T> {
    let url: string = "";
    if (requestParam.fullEndPoint)
      url = requestParam.fullEndPoint
    else
      url = `${this.url(requestParam)}/${id}`.replace(/\s/g, '');
    return this.httpClient.delete<T>(url, { headers: requestParam.headers })

  }
}
export class RequestParameters {

  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  queryString?:string;


}