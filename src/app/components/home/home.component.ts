import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home', 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = []; 
  movieForm: FormGroup;
  isEditMode: boolean = false;
  currentEditIndex: number | null = null;
  page: number = 1;  
  currentMovieId: number | null = null;
  selectedCategory: string = 'popular';

  categories = [
    { id: 'popular', name: '🔥 Phổ Biến' },
    { id: 'top_rated', name: '⭐ Xếp Hạng Cao' },
    { id: 'upcoming', name: '🎬 Sắp Ra Mắt' },
    { id: 'now_playing', name: '▶️ Đang Chiếu' }
  ];
  
  constructor(private movieService: MovieService, private fb: FormBuilder){ 

    this.movieForm = this.fb.group({
      title: [''],
      description: [''],
    overview: [''],
  vote_average: [''],
poster_path: [''] 
    });
  }
  ngOnInit(): void {
    this.loadMovies();
  }
  
  loadMovies(): void {
    this.movieService.getPopularMovies().subscribe((data) => {  
      this.movies = data; 
    }); 
  }
filterByCategory(category: string): void {
    this.selectedCategory = category;
    switch(category) {
      case 'popular':
        this.movieService.getPopularMovies().subscribe(data => this.movies = data);
        break;
      case 'top_rated':
        this.movieService.getTopRatedMovies().subscribe(data => this.movies = data);
        break;
      case 'upcoming':
        this.movieService.getUpcomingMovies().subscribe(data => this.movies = data);
        break;
      case 'now_playing':
        this.movieService.getNowPlayingMovies().subscribe(data => this.movies = data);
        break;
    }
  }
}