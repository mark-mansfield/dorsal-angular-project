import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';

const appRoutes: Routes = [
  // route path   , comopnet to load
  { path : '' , component: HomeComponent },
  { path : 'countries' , component: CountriesComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountriesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
