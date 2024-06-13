import { Component, EventEmitter, Input, Output} from '@angular/core';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-diet-selector',
  standalone: true,
  imports: [DropDownMenuComponent],
  templateUrl: './diet-selector.component.html',
  styleUrl: './diet-selector.component.scss'
})
export class DietSelectorComponent {

  fetchMeal: any = [];
  @Input() diets: { id: string, value: string, checked: boolean }[] = []; // Receive checked diets from parent
  @Output() dietsChanged: EventEmitter<{ id: string, checked: boolean }[]> = new EventEmitter<{ id: string, checked: boolean }[]>();
  @Output() mealFetched: EventEmitter<any[]> = new EventEmitter();

  constructor(private recipesService: RecipesService){}

  fetchMealByDiet(checkedAllDiets: string[]): void {
    this.recipesService.fetchMealByDiet(checkedAllDiets).subscribe({
      next: (recipe: any) => {
        this.fetchMeal = recipe.results;
        this.mealFetched.emit(this.fetchMeal);
      },
      error: (error) => { 
        console.error('Error fetching diet recipe:', error);
      }
    });
  }

  toggleDiet(id: string) {

    const checkedDiets = this.diets.map(diet => {
      if (diet.id === id) {
        diet.checked = !diet.checked; // iterates over the checkboxes array through a callbaack function (with the help of map() ) and toggles between checked and unchecked
      }
      return diet;
    });
    this.dietsChanged.emit(checkedDiets);
    
     // Here we check if any checkboxes are checked
     const anyChecked = this.diets.some(checkbox => checkbox.checked);

     // If true then...
     if (anyChecked) {
       // Collect IDs of all checked checkboxes
       const checkedDiets = this.diets.filter(checkbox => checkbox.checked).map(checkbox => checkbox.id);
       // Call the API for in regards to all checked checkboxes
      //  ------------------------------------------------------------------------API
       this.fetchMealByDiet(checkedDiets); 
     } else {
       // If no checkboxes are checked, output an empty array to represent "clearing" recipes
       this.mealFetched.emit([]);
     }
  } 
}
