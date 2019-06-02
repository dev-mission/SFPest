import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListMembershipsComponent, NewMembershipComponent } from '.';

const appRoutes: Routes = [
  {
    path: 'memberships',
    component: ListMembershipsComponent,
    children: [
      {
        path: 'new',
        component: NewMembershipComponent
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
export class MembershipsRoutingModule {}
