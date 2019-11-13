import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangeCpfPage } from './change-cpf.page';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: ChangeCpfPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    BrMaskerModule
  ],
  declarations: [ChangeCpfPage]
})
export class ChangeCpfPageModule {}
