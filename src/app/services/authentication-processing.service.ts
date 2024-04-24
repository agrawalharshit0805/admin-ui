import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationProcessingService {
  
  constructor(private router: Router) {}

  performDiscoFromState(currentUrl: string, currentState: string, stateParams: any) {
    // Your logout logic here :- 
    console.log('Logging out from state:', currentState);
    this.router.navigate(['/login']);  // Redirect to login or any other route
  }
}
