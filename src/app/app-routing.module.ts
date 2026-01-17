import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './components/update/update.component';
const routes: Routes = [
 { path: 'search', component: SearchComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'login', component: LoginComponent },   
  { path: 'register', component: RegisterComponent }, 
  {path: 'movie/:id', component: MovieDetailComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }