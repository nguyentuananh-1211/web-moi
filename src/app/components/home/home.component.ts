import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home', 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = []; 
  page: number = 1;  
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getPopularMovies(this.page).subscribe((data: any) => {
      // Logic quan trọng: Nối phim mới vào phim cũ (thay vì ghi đè)
      this.movies = [...this.movies, ...data.results];
      console.log("Danh sách phim:", this.movies);
    },
    (error) => {
        console.error('Lỗi rồi:', error);
      });
  }
  loadMore() {
    this.page++;
    this.getMovies();
  }
}