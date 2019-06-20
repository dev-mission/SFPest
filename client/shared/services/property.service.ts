import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class PropertyService {
  private property: any = null;
  subject = new BehaviorSubject<any>(null);

  refresh() {
  }

  get id() {
    if (this.property) {
      return this.property.id;
    }
    return '';
  }

  setProperty(property: any) {
    if (this.property && property && this.property.id == property.id) {
      return;
    }
    this.property = property;
    this.subject.next(this.property);
  }
}
