import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { PersonComponent } from './person.component';
import { PersonColumnComponent } from './person-column/person-column.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AccountComponent } from './account/account.component';

const router: Routes = [
  { path: '', redirectTo: 'persons', pathMatch: 'full' },
  {
    path: 'persons',
    component: PersonComponent,
    children: [
      { path: 'edit-porfile', component: EditProfileComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [
    PersonComponent,
    PersonColumnComponent,
    EditProfileComponent,
    AccountComponent
  ]
})
export class PersonModule { }
