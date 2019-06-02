import { Component, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService, PropertyService, UserService } from '../../shared/services';
import { ListComponent } from '../../shared/components';

@Component({
  templateUrl: './list.component.html'
})
export class ListMembershipsComponent {
  @ViewChild('inviteList') inviteList: ListComponent;
  @ViewChild('membershipList') membershipList: ListComponent;
  propertySubscription: Subscription = null;
  params: HttpParams = null;

  constructor(private api: ApiService, private currentProperty: PropertyService, private currentUser: UserService, private route: ActivatedRoute) {
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

  revokeMembership(record: any) {
    this.api.memberships.revoke(record.id).subscribe(response => {
      this.membershipList.refreshRecord(record.id);
    });
  }

  revokeInvite(record: any) {
    this.api.invites.revoke(record.id).subscribe(response => {
      this.inviteList.refreshRecord(record.id);
    });
  }
}
