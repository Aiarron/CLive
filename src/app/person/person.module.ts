import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { PersonComponent } from './person.component';

const router: Routes = [
  { path: '', redirectTo: 'persons', pathMatch: 'full' },
  { path: 'persons', component: PersonComponent },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [PersonComponent]
})
export class PersonModule { }
