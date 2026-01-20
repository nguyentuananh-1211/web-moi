import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Import thêm 'of' để xử lý videos nếu không có

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // private apiUrl = 'http://localhost:3000/movies';
  private apiUrl = 'https://696d86bad7bacd2dd713e2d4.mockapi.io/movies'; 

  constructor(private http: HttpClient) { }
  getPopularMovies(): Observable<any[]> {
return this.http.get<any[]>(this.apiUrl);
}
getTopRatedMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUpcomingMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getNowPlayingMovies(): Observable<any[]> {
    const currentDate = new Date().toISOString().split('T')[0];
    return this.http.get<any[]>(this.apiUrl);
  }
  getMovies(): Observable<any[]> {  
    return this.http.get<any[]>(this.apiUrl);
  }

  getMovieDetail(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  searchMovies(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?q=${query}`);
  }


  getMovieVideos(id: number | string): Observable<any> {

    return of({ results: [] }); 


  }


  createMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movie);
  }

  updateMovie(id: number, movie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, movie);
  }

  deleteMovie(id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}