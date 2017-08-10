import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RoutingModule } from "./routing.module";
import { HeadTabsDirective } from './directive/head-tabs.directive';

import { ErrorsService } from "./service/errors.service";

@NgModule({
  declarations: [
    AppComponent,
    HeadTabsDirective,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [
    ErrorsService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
