import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-property-form',
  templateUrl: './form.component.html'
})
export class PropertyFormComponent {
  @Input() record: any;
  @Input() error: any;
}
