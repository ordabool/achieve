import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';


import { AppComponent } from './app.component';
import { CreateAchievementComponent } from './components/create-achievement/create-achievement.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainJumbotronComponent } from './components/main-jumbotron/main-jumbotron.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { AchievementsByGenreComponent } from './components/achievements-by-genre/achievements-by-genre.component';
import { AchievementBoxComponent } from './components/achievement-box/achievement-box.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateAchievementComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    MainJumbotronComponent,
    ExploreComponent,
    AchievementsByGenreComponent,
    AchievementBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
