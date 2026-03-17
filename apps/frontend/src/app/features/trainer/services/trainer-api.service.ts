import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Council,
  Qualification,
  StartTestRequest,
  StartTestResponse,
  TestState,
  TestQuestion,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  CompleteTestResponse,
  TestResults,
} from '../models/trainer.interfaces';

@Injectable({ providedIn: 'root' })
export class TrainerApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getCouncils(): Observable<Council[]> {
    return this.http.get<Council[]>(`${this.apiUrl}/qualifications/councils`);
  }

  getQualifications(filter?: { councilId?: string; councilCode?: string }): Observable<Qualification[]> {
    const params: Record<string, string> = {};
    if (filter?.councilId) {
      params['councilId'] = filter.councilId;
    }
    if (filter?.councilCode) {
      params['councilCode'] = filter.councilCode;
    }
    return this.http.get<Qualification[]>(`${this.apiUrl}/qualifications`, {
      params,
    });
  }

  getQualification(id: string): Observable<Qualification> {
    return this.http.get<Qualification>(`${this.apiUrl}/qualifications/${id}`);
  }

  startTest(request: StartTestRequest): Observable<StartTestResponse> {
    return this.http.post<StartTestResponse>(
      `${this.apiUrl}/testing/start`,
      request,
    );
  }

  getTestState(testId: string): Observable<TestState> {
    return this.http.get<TestState>(`${this.apiUrl}/testing/${testId}`);
  }

  getQuestion(testId: string, orderNumber: number): Observable<TestQuestion> {
    return this.http.get<TestQuestion>(
      `${this.apiUrl}/testing/${testId}/question/${orderNumber}`,
    );
  }

  submitAnswer(
    testId: string,
    request: SubmitAnswerRequest,
  ): Observable<SubmitAnswerResponse> {
    return this.http.post<SubmitAnswerResponse>(
      `${this.apiUrl}/testing/${testId}/answer`,
      request,
    );
  }

  completeTest(testId: string): Observable<CompleteTestResponse> {
    return this.http.post<CompleteTestResponse>(
      `${this.apiUrl}/testing/${testId}/complete`,
      {},
    );
  }

  getResults(testId: string): Observable<TestResults> {
    return this.http.get<TestResults>(
      `${this.apiUrl}/testing/${testId}/results`,
    );
  }
}
