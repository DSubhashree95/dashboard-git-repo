import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    this.token = token;
  }

  getHeaders(): HttpHeaders {
    if (!this.token) throw new Error('Token not set');
    return new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  }

  getUserInfo(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}`, { headers: this.getHeaders() });
  }

  getRepos(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/repos`, { headers: this.getHeaders() });
  }

  getCommitActivity(owner: string, repo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/repos/${owner}/${repo}/stats/commit_activity`, { headers: this.getHeaders() });
  }

  getRepoLanguages(owner: string, repo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/repos/${owner}/${repo}/languages`, { headers: this.getHeaders() });
  }

  getCommits(owner: string, repo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/repos/${owner}/${repo}/commits`, { headers: this.getHeaders() });
  }
}
