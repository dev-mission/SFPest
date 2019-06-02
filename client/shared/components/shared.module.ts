import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'angular-sortablejs';

import { ArrayComponent, CurrentPropertyComponent, ErrorComponent, FormComponent, ListComponent, ModalComponent } from '.';

@NgModule({
  declarations: [
    ArrayComponent,
    CurrentPropertyComponent,
    ErrorComponent,
    FormComponent,
    ListComponent,
    ModalComponent
  ],
  exports: [
    ArrayComponent,
    CurrentPropertyComponent,
    ErrorComponent,
    FormComponent,
    ListComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SortablejsModule,
  ],
  providers: []
})
export class SharedComponentsModule {}
