import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedComponentsModule } from '../../shared/components';
import { SharedPipesModule } from '../../shared/pipes';

import { MembershipsRoutingModule } from './memberships-routing.module';
import { ListMembershipsComponent, NewMembershipComponent } from '.';

@NgModule({
  declarations: [
    ListMembershipsComponent,
    NewMembershipComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    SharedPipesModule,
    MembershipsRoutingModule,
  ],
  providers: []
})
export class MembershipsModule {}
