import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // 1. Import Router để chuyển trang

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  searchTerm: string = ''; 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Search(keyword: string): void 
  {
    if (keyword.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: keyword  } });
    }
  }
}