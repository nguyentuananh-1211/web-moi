import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import {Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  movies: any[] = [];
  movieForm: FormGroup;
  currentMovieId: any = null;
  isEditMode: boolean = false;

  constructor(private movieService: MovieService, private fb: FormBuilder, private router: Router) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      overview: [''],
      vote_average: [0],
      poster_path: [''],
      trailer_url: ['']
    });
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      console.log("Movies loaded:", this.movies);
      (error: any) => {
        console.error("Error loading movies:", error);
      }
    });
  }

  onSubmit() {
    const movieData = this.movieForm.value;
    if (this.isEditMode && this.currentMovieId) {
      this.movieService.updateMovie(this.currentMovieId, movieData).subscribe(() => {
        this.resetForm();
        this.loadMovies();
        alert('Cập nhật thành công!');
        this.router.navigate(['/list-movie']);
      });
    } else {
      this.movieService.createMovie(movieData).subscribe(() => {
        this.resetForm();
        this.loadMovies();
        alert('Thêm mới thành công!');
      });
    }
  }

  onEdit(movie: any) {
    this.isEditMode = true;
    this.currentMovieId = movie.id;
    this.movieForm.patchValue(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onDelete(id: number) {
    if (confirm('Xóa phim này nhé?')) {
      this.movieService.deleteMovie(id).subscribe(() => {
        this.loadMovies();
      });
    }
  }

  resetForm() {
    this.isEditMode = false;
    this.currentMovieId = null;
    this.movieForm.reset();
  }
}