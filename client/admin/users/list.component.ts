import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { PropertyService } from '../../shared/services';

@Component({
  templateUrl: './list.component.html'
})
export class ListUsersComponent {
  constructor(private route: ActivatedRoute) {
  }
}
