import { Component} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-specific-recipe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './specific-recipe.component.html',
  styleUrl: './specific-recipe.component.scss'
})
export class SpecificRecipeComponent {

  recipe: any = [];
  id: any; // declaring variable/property of type any
  constructor(private recipesService: RecipesService, private activatedRoute: ActivatedRoute){} //injecting ActivatedRoute service which gives us access to route information

  //This is method known as lifecycle hook and it is used to initialize the properties and fetch data from the server and store it in the property
  ngOnInit(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); // fetching the value of recipe.id parameter from the route and storing it in this.id note: the snapchot property basically takes a static image of the route
    // ------------------------------------------------------------------------API
    this.fetchSpecificRecipe(); 
  }

  extractSpecificSummary(text:any) {
    text = text.replace(/<[^>]*>/g, ''); 
    return text;
  }

  // ------------------------------------------------------------------------API
  fetchSpecificRecipe(): void {
    this.recipesService.fetchSpecificRecipe(this.id).subscribe({
      //This property deals with what to do when a new data is caught by the observable, which in this case it stores the data in this.recipe and this.recipte.summary after calling extractSpecificSummary()
      next: (recipe: any) => {
        this.recipe = recipe;
        this.recipe.summary = this.extractSpecificSummary(recipe.summary);
      },
      error: (error) => { // This property deals with the failure of fetching a recipe and thus we displat the error to the console
        console.error('Error fetching specific recipe:', error);
      }
    });
  }

}
