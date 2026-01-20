import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  safeTrailerUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // 1. Lấy ID từ thanh địa chỉ
    const id = this.route.snapshot.paramMap.get('id');

    // 2. Gọi API lấy toàn bộ danh sách để tìm phim
    this.movieService.getPopularMovies().subscribe({
      next: (listMovies) => {
        // Tìm phim có ID trùng khớp (dùng == để so sánh số và chuỗi)
        this.movie = listMovies.find((m: any) => m.id == id);

        if (this.movie) {
          console.log('Đã tìm thấy phim:', this.movie);
          
          // --- XỬ LÝ TRAILER ---
          if (this.movie.trailer_url) {
             // Gọi hàm getYouTubeId (đã được định nghĩa ở dưới cùng)
             const videoId = this.getYouTubeId(this.movie.trailer_url);
             
             // Tạo link embed và đánh dấu an toàn
             const embedUrl = `https://www.youtube.com/embed/${videoId}`;
             this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
          }
          // --------------------
        } else {
          console.error('Không tìm thấy phim có ID:', id);
        }
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách:', err);
      }
    });
  }

  // --- HÀM BẠN ĐANG THIẾU NẰM Ở ĐÂY ---
  // Hàm này giúp tách mã ID video từ link YouTube bất kỳ
  getYouTubeId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

}