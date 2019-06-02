import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditPropertyComponent, ListPropertiesComponent, NewPropertyComponent } from '.';

const appRoutes: Routes = [
  {
    path: 'properties',
    component: ListPropertiesComponent,
    children: [
      {
        path: 'new',
        component: NewPropertyComponent
      },
      {
        path: ':id',
        component: EditPropertyComponent
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
export class PropertiesRoutingModule {}
