import { Component } from '@angular/core';

import { NavigationService, PropertyService } from '../../shared/services';

@Component({
  templateUrl: './new.component.html'
})
export class NewMembershipComponent {
  constructor(public currentProperty: PropertyService, private navigation: NavigationService) {}

  onCreate() {
    this.navigation.backTo('/memberships');
  }
}
