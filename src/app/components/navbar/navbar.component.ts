import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'stream-chat';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

searchSubmitted = false  
search: string = ""
searchResults?: User[]
noResults = false

onSearch() {
  this.searchSubmitted = true
  this.postService.getUsersMatching(this.search).subscribe({
    next: (data: any) => {
      if ((data as User[]).length === 0) this.noResults = true;
      else this.noResults = false
      this.searchSubmitted = false
      this.searchResults = data
      console.log(data)
    },
    error: (error: any) => {
      console.log(error)
      this.searchSubmitted = false
    }
  })
}

  searchForm = this.formBuilder.group({
    search: [""]
  })

  constructor(public authService: AuthService, private router: Router, private formBuilder: FormBuilder, private postService: PostService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('non-dark-theme');
  }
}
