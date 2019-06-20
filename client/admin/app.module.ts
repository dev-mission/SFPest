import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MembershipsModule } from './memberships/memberships.module';
import { PropertiesModule } from './properties/properties.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';

import { ApiService, NavigationService, PropertyService, UserService } from '../shared/services';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MembershipsModule,
    PropertiesModule,
    ReportsModule,
    UsersModule
  ],
  providers: [
    ApiService,
    NavigationService,
    PropertyService,
    UserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
