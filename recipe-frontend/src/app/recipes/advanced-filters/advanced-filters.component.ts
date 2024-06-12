import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { RecipesComponent } from '../recipes.component';

@Component({
  selector: 'app-advanced-filters',
  standalone: true,
  imports: [RecipesComponent],
  templateUrl: './advanced-filters.component.html',
  styleUrl: './advanced-filters.component.scss'
})
export class AdvancedFiltersComponent {
  fetchMeal: any = [];
  params: string = ''; // property that will be used to store all parameters

  constructor(private recipesService: RecipesService){}

  submitForm(): void {
    const form = document.getElementById('recipeForm') as HTMLFormElement; // access the form
    const mealtimeCheckboxes = form.querySelectorAll<HTMLInputElement>('input[name="mealtime"]:checked'); // collecting all checked checkboxes
    const intoleranceCheckboxes = form.querySelectorAll<HTMLInputElement>('input[name="intolerance"]:checked');
    const dietCheckboxes = form.querySelectorAll<HTMLInputElement>('input[name="diet"]:checked');
    
    const selectedMealtime = Array.from(mealtimeCheckboxes).map(checkbox => checkbox.value); //extracting only the values from the selected checkboxes
    const selectedIntolerances = Array.from(intoleranceCheckboxes).map(checkbox => checkbox.value);
    const selectedDiets = Array.from(dietCheckboxes).map(checkbox => checkbox.value);
    
    // Replace spaces with plus signs
    const mealtimeChoice = selectedMealtime.map(option => option.replace(/ /g, '+')).join(','); // here we are replacing all spaces with + symbol 
    const intoleranceChoice = selectedIntolerances.map(option => option.replace(/ /g, '+')).join(',');
    const dietChoice = selectedDiets.map(option => option.replace(/ /g, '+')).join(',');
    
    // array for appending the checked values to their specific type only if there has been at least one checked checkbox
    const paramsArray = [];
    if (selectedMealtime.length > 0) {
      paramsArray.push('type=' + mealtimeChoice);
    }
    if (selectedIntolerances.length > 0) {
      paramsArray.push('intolerances=' + intoleranceChoice);
    }
    if (selectedDiets.length > 0) {
      paramsArray.push('diet=' + dietChoice);
    }
   
   // here we join the parameters with "&" separator because it is important when using API
   this.params = paramsArray.join('&');

   this.advancedFilter(); // Finally, here we call our method for fetching the data
  }

   // ------------------------------------------------------------------------API
   advancedFilter(): void {
    this.recipesService.advancedFilter(this.params).subscribe({
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
