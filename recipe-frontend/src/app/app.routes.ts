import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { MealtimeComponent } from './recipes/mealtime/mealtime.component';
import { AdvancedFiltersComponent } from './recipes/advanced-filters/advanced-filters.component';
import { SpecificRecipeComponent } from './recipes/specific-recipe/specific-recipe.component';
import { PageNotFoundComponent } from './recipes/page-not-found/page-not-found.component';
import { LoginComponent } from './header/login/login.component';
import { SignupComponent } from './header/signup/signup.component';

export const routes: Routes = [
    {'path':'home', 'title':'Home', component: RecipesComponent},
    {'path':'mealtime', 'title':'Customize meal',  component: MealtimeComponent},
    {'path':'advanced-filters', 'title':'Advanced Filters',  component: AdvancedFiltersComponent},
    {'path':'recipe/specific/:id', 'title':'Specific recipe',  component: SpecificRecipeComponent},
    {'path':'login', 'title':'Login',  component: LoginComponent},
    {'path':'signup', 'title':'Sign Up',  component: SignupComponent},
    {'path':'', redirectTo:'/home', pathMatch:'full'},
    {'path':'**', 'title':'404',  component: PageNotFoundComponent},
];
