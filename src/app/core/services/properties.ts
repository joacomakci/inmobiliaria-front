import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Property } from '../models/property.model';

export interface PropertyFilters {
  operation?: string;
  type?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/properties`;

  findAll(filters?: PropertyFilters): Observable<Property[]> {
    let params = new HttpParams();

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value);
        }
      }
    }

    return this.http.get<Property[]>(this.baseUrl, { params });
  }

  findOne(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/${id}`);
  }

  findBySlug(slug: string): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/slug/${slug}`);
  }
}