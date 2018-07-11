import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRouting } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/header-component/header.component";
import { NavigationComponent } from "./components/navigation-component/navigation.component";
import { FooterComponent } from "./components/footer-component/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    appRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
