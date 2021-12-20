import { Part } from '@core/models/part.model';
import { PartApi } from '@core/api/part.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PartService {
  constructor(private partApi: PartApi) {}

  getAllParts(): Observable<Part[]> {
    return this.partApi.getParts();
  }

  createPart(part: Part): Observable<Part> {
    return this.partApi.createPart(part);
  }

  deletePart(id: string): Observable<Part> {
    return this.partApi.deletePart(id);
  }

}
