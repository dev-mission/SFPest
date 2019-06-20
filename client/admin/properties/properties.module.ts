import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedComponentsModule } from '../../shared/components';
import { SharedPipesModule } from '../../shared/pipes';

import { PropertiesRoutingModule } from './properties-routing.module';
import { EditPropertyComponent, ListPropertiesComponent, NewPropertyComponent, PropertyFormComponent } from '.';

@NgModule({
  declarations: [
    EditPropertyComponent,
    ListPropertiesComponent,
    NewPropertyComponent,
    PropertyFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PropertiesRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
  ],
  providers: []
})
export class PropertiesModule {}
