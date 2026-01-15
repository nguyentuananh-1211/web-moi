import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = []; // Danh sách phim
  page: number = 1;   // Trang hiện tại (Mặc định là 1)

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getPopularMovies(this.page).subscribe((data) => {
      // Logic quan trọng: Nối phim mới vào phim cũ (thay vì ghi đè)
      this.movies = [...this.movies, ...data.results];
    });
  }

  // Hàm được gọi khi bấm nút "Xem thêm"
  loadMore() {
    this.page++; // Tăng số trang lên (1 -> 2 -> 3...)
    this.getMovies(); // Gọi lại API để lấy trang mới
  }
}