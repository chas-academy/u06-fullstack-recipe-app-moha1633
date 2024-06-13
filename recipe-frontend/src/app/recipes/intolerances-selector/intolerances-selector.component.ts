import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-intolerances-selector',
  standalone: true,
  imports: [DropDownMenuComponent],
  templateUrl: './intolerances-selector.component.html',
  styleUrl: './intolerances-selector.component.scss'
})
export class IntolerancesSelectorComponent {

  @Output() title :string = "Select Intolerance";
  fetchMeal: any = [];
  @Input() checkboxes: { id: string, value: string, checked: boolean }[] = [];
  @Output() checkboxesChanged: EventEmitter<{ id: string, checked: boolean }[]> = new EventEmitter();
  @Output() mealFetched: EventEmitter<any[]> = new EventEmitter();

  constructor(private recipesService: RecipesService){}

  // ------------------------------------------------------------------------API
  fetchMealByAllergy(checkedAllergies: string[]): void {
    this.recipesService.fetchMealByAllergy(checkedAllergies).subscribe({
      next: (recipe: any) => {
        this.fetchMeal = recipe.results;
        this.mealFetched.emit(this.fetchMeal);
      },
      error: (error) => { 
        console.error('Error fetching meal recipe:', error);
      }
    });
  }

  toggleAllergy(id: string) {

    const updatedCheckboxes = this.checkboxes.map(checkbox => {
      if (checkbox.id === id) {
        checkbox.checked = !checkbox.checked; // iterates over the checkboxes array through a callbaack function (with the help of map() ) and toggles between checked and unchecked
      }
      return checkbox;
    });
    this.checkboxesChanged.emit(updatedCheckboxes);

    // Here we check if any checkboxes are checked
    const anyChecked = this.checkboxes.some(checkbox => checkbox.checked);

    // If true then...
    if (anyChecked) {
      // Collect IDs of all checked checkboxes
      const checkedAllergies = this.checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.id);
      // Call the API in regards to all checked checkboxes
      // ------------------------------------------------------------------------API
      this.fetchMealByAllergy(checkedAllergies);
    } else {
      // If no checkboxes are checked, output an empty array to represent "clearing" recipes
      this.mealFetched.emit([]);
    }
  } 
  

}
