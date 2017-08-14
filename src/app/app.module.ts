import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RoutingModule } from "./routing.module";
import { ErrorsService } from "./service/errors.service";

import { HeadTabsDirective } from './directive/head-tabs.directive';
import { IndexShowInfoDirective } from './directive/index-show-info.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeadTabsDirective,
    IndexShowInfoDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [
    ErrorsService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
