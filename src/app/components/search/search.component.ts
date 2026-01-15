import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies: any[] = [];
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    // Theo dõi thanh địa chỉ liên tục
    this.route.params.subscribe(params => {
      // Lấy từ khóa 'query' cho khớp với file Routing
      this.query = params['query']; 
      
      console.log("Từ khóa nhận được:", this.query);

      // Nếu có từ khóa thì mới gọi API
      if (this.query) {
        this.searchMovies();
      }
    });
  }

  searchMovies() {
    this.movieService.searchMovies(this.query).subscribe(data => {
      this.movies = data.results;
      console.log("Đã tìm thấy phim:", this.movies);
    });
  }
}