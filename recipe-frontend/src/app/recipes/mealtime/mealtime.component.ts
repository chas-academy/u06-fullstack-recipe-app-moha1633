import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RecipesComponent } from '../recipes.component';
import { FormsModule } from '@angular/forms';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-mealtime',
  standalone: true,
  imports: [RecipesComponent, FormsModule, DropDownMenuComponent],
  templateUrl: './mealtime.component.html',
  styleUrl: './mealtime.component.scss'
})
export class MealtimeComponent{
  selectedMeal: string = '';
  fetchMeal: any = [];
  dietDropDownStatus: boolean = false;
  dropDownStatus: boolean = false;
  fetchedMeals: any[] = [];

  constructor(private recipesService: RecipesService){}

  receiveFetchedMeals(meals: any[]) {
    this.fetchMeal = meals;
  }

  // ------------------------------------------------------------------------API
  selectMealOption(option :string){
    this.selectedMeal = option;
    this.fetchMealOption();
  }

  // ------------------------------------------------------------------------API
  fetchMealOption(): void {
    this.recipesService.fetchMealOption(this.selectedMeal).subscribe({
      //property deals with what to do when a new data is caught by the observable, which in this case it stores the data in this.recipe and this.recipte.summary after calling extractSpecificSummary()
      next: (recipe: any) => {
        this.fetchMeal = recipe.results;
      },
      error: (error) => { // This property deals with the failure of fetching a recipe and thus we displat the error to the console
        console.error('Error fetching mealtype recipe:', error);
      }
    });
  }
}



