import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ApiService, PropertyService } from '../services';

@Component({
  selector: 'app-shared-current-property',
  templateUrl: './current-property.component.html'
})
export class CurrentPropertyComponent {
  properties: any[] = null;
  selectedProperty: any = null;

  constructor(private api: ApiService, private currentProperty: PropertyService) {}

  ngOnInit() {
    this.api.properties.index().subscribe((response: HttpResponse<any>) => {
      this.properties = response.body;
      this.selectedProperty = this.properties[0];
      this.currentProperty.setProperty(this.selectedProperty);
    });
  }

  onChangeProperty(event: any) {
    this.currentProperty.setProperty(this.selectedProperty);
  }
}
