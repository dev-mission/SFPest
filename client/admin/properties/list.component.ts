import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list.component.html'
})
export class ListPropertiesComponent {
  constructor(private route: ActivatedRoute) {}
}
