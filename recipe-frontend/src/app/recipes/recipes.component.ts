import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit{
  @Input() showTitle: boolean = true;
  @Input() recipes: any[] = [];

  constructor(private recipesService: RecipesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      // Check if the current route is the home page
      if (this.route.snapshot.url[0].path === 'home') {
        this.fetchRecipes(); 
      }
  }

  // ------------------------------------------------------------------------API
  fetchRecipes(): void {
    this.recipesService.fetchRecipes().subscribe((recipes: any) => {
      this.recipes = recipes.recipes;
    });
  }
}
