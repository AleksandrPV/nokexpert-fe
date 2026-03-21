import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface TrainerDemoRequest {
  name: string;
  phone: string;
  email: string;
}

export interface TrainerDemoResponse {
  success: boolean;
  message: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrainerDemoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/trainer-demo-requests`;

  submitDemoRequest(data: TrainerDemoRequest): Observable<TrainerDemoResponse> {
    return this.http.post<TrainerDemoResponse>(this.apiUrl, data);
  }
}
