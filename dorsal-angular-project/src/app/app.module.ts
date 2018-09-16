import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { StatesListComponent } from './states-list/states-list.component';
import { ZonesListComponent } from './zones-list/zones-list.component';
import { LocationsListComponent } from './locations-list/locations-list.component';

const appRoutes: Routes = [
  // route path   , comopnet to load
  { path : '' , component: HomeComponent },
  { path : 'countries' , component: CountriesComponent },
  { path : 'list-states' , component: StatesListComponent },
  { path : 'list-zones' , component: ZonesListComponent },
  { path : 'list-locations' , component: LocationsListComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountriesComponent,
    StatesListComponent,
    ZonesListComponent,
    LocationsListComponent
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
