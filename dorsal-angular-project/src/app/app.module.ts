import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
const appRoutes: Routes = [
  // route path   , comopnet to load
  { path : '' , component: HomeComponent },
  { path : 'countries' , component: CountriesComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountriesComponent,
    SharkDataComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
