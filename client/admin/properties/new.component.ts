import { Component } from '@angular/core';

import { NavigationService } from '../../shared/services';

@Component({
  templateUrl: './new.component.html'
})
export class NewPropertyComponent {
  constructor(private navigation: NavigationService) {}

  onCreate() {
    this.navigation.backTo('/properties');
  }
}
