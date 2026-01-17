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
    this.route.queryParams.subscribe(params => {
      this.query = params['q']; 
      
      console.log("Từ khóa nhận được:", this.query);

      if (this.query) {
        this.searchMovies();
      }
    });
  }
  searchMovies() {
    this.movieService.searchMovies(this.query).subscribe(data => {
      this.movies = data;
      console.log("Đã tìm thấy phim:", this.movies);
    });
  }
}