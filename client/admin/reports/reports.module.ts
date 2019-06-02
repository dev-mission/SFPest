import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsModule } from '../../shared/components';
import { SharedPipesModule } from '../../shared/pipes';

import { ReportsRoutingModule } from './reports-routing.module';
import { EditReportComponent, ListReportsComponent } from '.';

@NgModule({
  declarations: [
    EditReportComponent,
    ListReportsComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedPipesModule,
    ReportsRoutingModule
  ],
  providers: []
})
export class ReportsModule {}
