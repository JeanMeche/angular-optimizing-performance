import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

import { EmployeeListComponent } from './employee-list.component';
import { CalculatePipe } from '../pipes/calculate.pipe';
import { ListComponent } from './list/list.component';
import { NameInputComponent } from './name-input/name-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule
  ],
  declarations: [EmployeeListComponent, CalculatePipe, ListComponent, NameInputComponent],
  providers: [],
  exports: [EmployeeListComponent]
})
export class EmployeeListModule { }
