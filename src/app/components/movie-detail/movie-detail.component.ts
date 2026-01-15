import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // 1. Import cái này để xử lý link an toàn

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  videoUrl: SafeResourceUrl | null = null; 

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer //
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Lấy thông tin phim
      this.movieService.getMovieDetail(id).subscribe((data) => {
        this.movie = data;
      });

      // 3. Lấy Trailer phim
      this.movieService.getMovieVideos(id).subscribe((data) => {
        if (data.results && data.results.length > 0) {
          // Tìm video nào là 'Trailer' và ở trên 'YouTube'
          const trailer = data.results.find((vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube');
          
          if (trailer) {
            const url = 'https://www.youtube.com/embed/' + trailer.key;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          }
        }
      });
    }
  }
}