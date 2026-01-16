import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http'; 
import { Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})  
export class MovieService {
    private apiKey: string = "547efffa5b057444a2d539a78f77f612";
    private baseURL: string = environment.baseURL;
    
  constructor(private http: HttpClient) { }
 getPopularMovies(page: number): Observable<any> {
  return this.http.get(`${this.baseURL}/movie/popular?api_key=${this.apiKey}&language=vi-VN&page=${page}`);
}
  getMovieDetail(id: string): Observable<any> {
  return this.http.get(`${this.baseURL}/movie/${id}?api_key=${this.apiKey}&language=vi-VN`);
  }
searchMovies(term: string): Observable<any> {
  return this.http.get(`${this.baseURL}/search/movie?api_key=${this.apiKey}&query=${term}&language=vi-VN`);
}
getMovieVideos(id: string): Observable<any> {
  return this.http.get(`${this.baseURL}/movie/${id}/videos?api_key=${this.apiKey}`);
}
}
