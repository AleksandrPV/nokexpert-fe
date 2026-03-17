import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface UserTestHistoryItem {
  testId: string;
  mode: string;
  status: string;
  score: number | null;
  passed: boolean;
  totalQuestions: number;
  qualificationTitle: string;
  startedAt: string;
  finishedAt: string | null;
  timeTakenSeconds: number;
}

export interface UserTestHistoryResponse {
  items: UserTestHistoryItem[];
  total: number;
}

export interface UserStatsResponse {
  totalTests: number;
  completedTests: number;
  avgScore: number;
  bestScore: number;
  passRate: number;
  totalTimeSec: number;
}

@Injectable({ providedIn: 'root' })
export class StatisticsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/testing`;

  getMyTests(page = 1, limit = 20): Observable<UserTestHistoryResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<UserTestHistoryResponse>(`${this.baseUrl}/my-tests`, { params });
  }

  getMyStats(): Observable<UserStatsResponse> {
    return this.http.get<UserStatsResponse>(`${this.baseUrl}/my-stats`);
  }
}
