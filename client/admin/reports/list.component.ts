import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PropertyService } from '../../shared/services';

@Component({
  templateUrl: './list.component.html'
})
export class ListReportsComponent {
  propertySubscription: Subscription = null;
  params: HttpParams = null;

  constructor(private currentProperty: PropertyService, public route: ActivatedRoute) {
    this.propertySubscription = currentProperty.subject.subscribe((property: any) => {
      if (property) {
        this.params = (new HttpParams()).set('propertyId', property.id);
      } else {
        this.params = null;
      }
    });
  }

  ngOnDestroy() {
    this.propertySubscription.unsubscribe();
  }
}
