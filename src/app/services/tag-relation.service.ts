import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagRelationService {

  constructor(private http: HttpClient) { }

  getTagRelationList() {
    return this.http.get<any>(
      `http://127.0.0.1:8000/api/tag_relation/`
    )
  }
}
