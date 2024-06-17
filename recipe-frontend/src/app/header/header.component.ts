import { Component, ChangeDetectorRef } from '@angular/core';
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

  constructor(public authService: AuthService, private router: Router, private cd: ChangeDetectorRef) { }

  hideMenu(): void {
    const menuToggle = document.getElementById('menu-toggle') as HTMLInputElement;
    if (menuToggle) {
      menuToggle.checked = false;
    }
  }

  logout(): void {
    this.authService.logout().subscribe(success => {
      if (success) {
        this.router.navigate(['/login']);
        this.hideMenu();
        this.cd.detectChanges();  // Ensure view is updated
      } else {
        this.loginError = "Unable to logout";
      }
    });
  }
}
