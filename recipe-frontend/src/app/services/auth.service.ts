import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map, tap, Observable, of } from 'rxjs';
import { LoginDetails } from '../interfaces/login-details';
import { RegisterDetails } from '../interfaces/register-details';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private confirmationMessage: string = "";
  private loggedIn = false;
  private token :string =" ";
  private baseURL = 'https://u06-fullstack-recipe-app-moha1633.onrender.com/api/'; 

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  loginUser(loginDetails: LoginDetails): Observable<boolean> {
    return this.http.post<any>(this.baseURL + "login", loginDetails, this.httpOptions)
      .pipe(
          map(result => {
          // if token exists in the result then... login was successful
          if (result.token) {
            localStorage.setItem("token", result.token);
            return true;
          } else {
            // If token does not exist, login has failed
            return false;
          }
        }),
        catchError(error => {
          console.error("Error:", error);
          return of(false); 
        })
    );
       
  }

  registerUser(RegisterDetails: RegisterDetails): Observable<boolean> {
    return this.http.post<any>(this.baseURL + "register", RegisterDetails, this.httpOptions)
      .pipe(
          map(response => {
          // if the registration was sucessful then... 
          if (response) {
             // Here we set a confirmation message
             this.confirmationMessage = "Account registered successfully!";
            return response.user !== undefined && response.token !== undefined;
          } else {
            // if it fails, then it is not possible to create an account
            return false;
          }
        }),
        catchError(error => {
          console.error("Error:", error);
          return of(false); 
        })
    );
       
  }

    // Here we are getting confirmation message
    getConfirmationMessage(): string {
      return this.confirmationMessage;
    }

  logout(): Observable<boolean>  {
     
     // remove token from localStorage
     const token = localStorage.getItem('token');
     
     // Here we create a new http options where we include the token we stored earlier and we now place it inside the headers for logout
     const httpOptions = {
         headers: new HttpHeaders({
             'Content-Type':  'application/json',
             'Authorization': `Bearer ${token}`
         })
     };
     
    // here we use httpOptions to basically post all necessary information to logout
    return this.http.post<any>(this.baseURL + "logout", {}, httpOptions)
    .pipe(
        map(result => {
          localStorage.removeItem('token');
          return true;
        }),
        catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred display the error
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');   // shorthand way to check if the value returned is truthy or falsy
  }

}
