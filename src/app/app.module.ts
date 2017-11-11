import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TranslateComponent } from './translate/translate.component';
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import { DayLifeComponent } from './day-life/day-life.component';


@NgModule({
  declarations: [
    AppComponent,
    TranslateComponent,
    DayLifeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
