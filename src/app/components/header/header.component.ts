import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) {}

 search(term: string): void {
  // 1. In ra xem hàm có chạy không và nhận được chữ gì
  console.log('Đã gọi hàm search!'); 
  console.log('Từ khóa nhận được:', term);

  if (term) {
    this.router.navigate(['/search', term]);
  }
  }
}
