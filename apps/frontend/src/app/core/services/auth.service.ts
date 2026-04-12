import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../models/auth.interfaces';

const TOKEN_KEY = 'nok_token';
const USER_KEY = 'nok_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly currentUser = signal<User | null>(null);
  readonly token = signal<string | null>(null);
  readonly isAuthenticated = computed(() => !!this.token());

  constructor() {
    this.loadFromStorage();
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/users/login`, data)
      .pipe(
        tap((res) => this.handleAuth(res)),
        catchError((err) => throwError(() => err)),
      );
  }

  register(data: RegisterRequest): Observable<{ success: true; message: string }> {
    return this.http
      .post<{ success: true; message: string }>(`${environment.apiUrl}/users/register`, data)
      .pipe(
        catchError((err) => throwError(() => err)),
      );
  }

  logout(): void {
    this.token.set(null);
    this.currentUser.set(null);
    if (this.isBrowser) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return this.token();
  }

  private handleAuth(res: AuthResponse): void {
    this.token.set(res.access_token);
    this.currentUser.set(res.user);
    if (this.isBrowser) {
      localStorage.setItem(TOKEN_KEY, res.access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    }
  }

  handleUnauthorized(): void {
    this.token.set(null);
    this.currentUser.set(null);
    if (this.isBrowser) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 < Date.now() : false;
    } catch {
      return true;
    }
  }

  private loadFromStorage(): void {
    if (!this.isBrowser) return;
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);
    if (token && userJson) {
      try {
        if (this.isTokenExpired(token)) {
          this.handleUnauthorized();
          return;
        }
        this.token.set(token);
        this.currentUser.set(JSON.parse(userJson));
      } catch {
        this.handleUnauthorized();
      }
    }
  }
}
