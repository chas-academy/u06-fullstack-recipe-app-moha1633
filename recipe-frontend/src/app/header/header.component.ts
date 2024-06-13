import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loginError: string = "";

  constructor(public authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout().subscribe(success => {
      if (success) {
        this.router.navigate(['/login']);
      } else {
        // Display message in case of login failure
        this.loginError = "Unable to logout";
      }
    });
  }
}
