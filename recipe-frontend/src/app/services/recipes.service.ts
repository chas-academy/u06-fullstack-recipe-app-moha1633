import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private key: string = '9a862cf9f42d4357a3462b6a52d76471';
  private BASE_URL: string = 'https://api.spoonacular.com/recipes';


  constructor(private http: HttpClient) { }

  fetchRecipes(): Observable<any>{ 
    return this.http.get(`${this.BASE_URL}/random?number=50&apiKey=${this.key}`);
  }

  fetchSpecificRecipe(id: string): Observable<any>{
    return this.http.get(`${this.BASE_URL}/${id}/information?apiKey=${this.key}`);
  }

  fetchMealOption(id: string): Observable<any>{ 
    return this.http.get(`${this.BASE_URL}/complexSearch?type=${id}&apiKey=${this.key}`);
  }

  fetchMealByAllergy(checkedAllergies: string[]): Observable<any>{ 
    const intolerances = checkedAllergies.join(',');
    return this.http.get(`${this.BASE_URL}/complexSearch?intolerances=${intolerances}&number=100&apiKey=${this.key}`);
  } 

  fetchMealByDiet(checkedDiets: string[]): Observable<any>{ 
    const diets = checkedDiets.join(',');
    return this.http.get(`${this.BASE_URL}/complexSearch?diet=${diets}&number=100&apiKey=${this.key}`);
  } 

  advancedFilter(params: string): Observable<any>{ 
    return this.http.get(`${this.BASE_URL}/complexSearch?${params}&number=100&apiKey=${this.key}`);
  }
}

