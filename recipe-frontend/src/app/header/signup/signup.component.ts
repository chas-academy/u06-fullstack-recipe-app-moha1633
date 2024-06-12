import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterDetails } from '../../interfaces/register-details';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  password_confirmation: string = "";
  loginError: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  registerUser(): void {
    const RegisterDetails: RegisterDetails = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    };
    this.authService.registerUser(RegisterDetails).subscribe(success => {
      if (success) {
        // Here we redirect or navigate to the login page once registering is sucessful
        this.router.navigate(['/login']);
      } else {
        // Handle login failure, show error message if the registration fails
        this.loginError = "Unable to register. Please try again later.";
      }
    });
  }
  

}
