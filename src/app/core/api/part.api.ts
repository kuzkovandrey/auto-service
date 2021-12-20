import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '@core/enums/api-endpoint.enum';
import { Part } from '@core/models/part.model';

@Injectable()
export class PartApi {
  constructor(private http: HttpClient) { }

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(ApiEndpoint.PARTS);
  }

  createPart(part: Part): Observable<Part> {
    return this.http.post<Part>(ApiEndpoint.PARTS, part);
  }

  changePart(id: string, part: Part): Observable<Part> {
    return this.http.patch<Part>(`${ApiEndpoint.PARTS}/${id}`, part);
  }

  deletePart(id: string): Observable<Part> {
    return this.http.delete<Part>(`${ApiEndpoint.PARTS}/${id}`);
  }
}
