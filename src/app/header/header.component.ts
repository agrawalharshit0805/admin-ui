import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthenticationProcessingService } from '../services/authentication-processing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userName!: string;

 // constructor(private authService: AuthenticationProcessingService, private router: Router) {}

  ngOnInit(): void {
    this.userName; 
  }

  logout(event: Event): void {
    event.preventDefault();
   //this.authService.performDiscoFromState(this.router.url, 'currentState', {});
  }
}
