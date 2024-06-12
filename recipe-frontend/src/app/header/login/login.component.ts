import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDetails } from '../../interfaces/login-details';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  email: string = "";
  password: string = "";
  loginError: string = "";
  confirmationMessage: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve confirmation message from AuthService
    this.confirmationMessage = this.authService.getConfirmationMessage();
  }

  login(): void {
    const loginDetails: LoginDetails = {
      email: this.email,
      password: this.password
    };
    this.authService.loginUser(loginDetails).subscribe(success => {
      if (success) {
        // Redirect or navigate to another page upon successful login
        this.router.navigate(['/home']);
      } else {
        // Handle login failure, show error message, etc.
        this.loginError = "Invalid email or password.";
      }
    });
  }

}
