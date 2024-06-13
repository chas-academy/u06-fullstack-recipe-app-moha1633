import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IntolerancesSelectorComponent } from '../intolerances-selector/intolerances-selector.component';
import { DietSelectorComponent } from '../diet-selector/diet-selector.component';

@Component({
  selector: 'app-drop-down-menu',
  standalone: true,
  imports: [IntolerancesSelectorComponent, DietSelectorComponent],
  templateUrl: './drop-down-menu.component.html',
  styleUrl: './drop-down-menu.component.scss'
})
export class DropDownMenuComponent {

  @Input() dietDropDownStatus: boolean = false;
  @Input() dropDownStatus: boolean = false;
  @Input() type: string = '';
  @Output() mealFetched: EventEmitter<any[]> = new EventEmitter<any[]>();

  receiveFetchedMeals(meals: any[]) {
    this.mealFetched.emit(meals); // Pass the fetched meal data to to mealtime
  }

  checkboxes: { id: string, value: string, checked: boolean }[] = [
    { id: 'dairy', value: 'Dairy', checked: false},
    { id: 'egg', value: 'Egg', checked: false},
    { id: 'gluten', value: 'Gluten', checked: false},
    { id: 'grain', value: 'Grain', checked: false},
    { id: 'peanut', value: 'Peanut', checked: false},
    { id: 'seafood', value: 'Seafood', checked: false},
    { id: 'sesame', value: 'Sesame', checked: false},
    { id: 'shellfish', value: 'Shellfish', checked: false},
    { id: 'soy', value: 'Soy', checked: false},
    { id: 'sulfite', value: 'Sulfite', checked: false},
    { id: 'tree-nut', value: 'Tree Nut', checked: false},
    { id: 'wheat', value: 'Wheat', checked: false},
  ];

  diets: { id: string, value: string, checked: boolean }[] = [
    { id: 'gluten Free', value: 'Gluten Free', checked: false },
    { id: 'ketogenic', value: 'Ketogenic', checked: false },
    { id: 'vegetarian', value: 'Vegetarian', checked: false },
    { id: 'lacto Vegetarian', value: 'Lacto-Vegetarian', checked: false },
    { id: 'ovo Vegetarian', value: 'Ovo-Vegetarian', checked: false },
    { id: 'vegan', value: 'Vegan', checked: false },
    { id: 'pescetarian', value: 'Pescetarian', checked: false },
    { id: 'paleo', value: 'Paleo', checked: false },
    { id: 'primal', value: 'Primal', checked: false },
    { id: 'low FODMAP', value: 'Low FODMAP', checked: false },
    { id: 'whole30', value: 'Whole30', checked: false }
];

  toggleDropdown() {
    if (this.type === 'diet') {
      this.dietDropDownStatus = !this.dietDropDownStatus;
      this.dropDownStatus = false; 
    } else if (this.type === 'intolerance') {
      this.dropDownStatus = !this.dropDownStatus;
      this.dietDropDownStatus = false;
    }
  }

  updateCheckboxes(checkboxes: { id: string, checked: boolean }[]) {
    // Update the checked state of checkboxes
    this.checkboxes = this.checkboxes.map(checkbox => {
      const updatedCheckbox = checkboxes.find(cb => cb.id === checkbox.id);
      if (updatedCheckbox) {
        checkbox.checked = updatedCheckbox.checked;
      }
      return checkbox;
    });
  }

  updateDietCheckboxes(diets: { id: string, checked: boolean }[]) {
    // Update the checked state of diets
    this.diets = this.diets.map(diet => {
      const updatedDiet = diets.find(d => d.id === diet.id);
      if (updatedDiet) {
        diet.checked = updatedDiet.checked;
      }
      return diet;
    });
  }
}
