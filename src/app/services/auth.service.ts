import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://tu-backend.com/api';
  private tokenKey = 'authToken';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
