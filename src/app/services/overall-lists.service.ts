import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverallListsService {

  constructor(private http: HttpClient) { }
  
  getOverallList() {
      return this.http.get<any>(
        `http://127.0.0.1:8000/api/overall_analytics/`
      );
    }
}
