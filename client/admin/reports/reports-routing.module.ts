import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditReportComponent, ListReportsComponent } from '.';

const appRoutes: Routes = [
  {
    path: 'reports',
    component: ListReportsComponent,
    children: [
      {
        path: ':id',
        component: EditReportComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReportsRoutingModule {}
