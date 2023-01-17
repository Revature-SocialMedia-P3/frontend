import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
onSearch() {
  this.postService.getUsersMatching(this.searchForm.value.search!).subscribe({
    next: (data: any) => {
      console.log(data)
    },
    error: (error: any) => {
      console.log(error)
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
