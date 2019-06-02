import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorPipe, PhonePipe, WhatPipe } from '.';

@NgModule({
  declarations: [
    ErrorPipe,
    PhonePipe,
    WhatPipe,
  ],
  exports: [
    ErrorPipe,
    PhonePipe,
    WhatPipe,
  ],
  imports: [
    CommonModule,
  ],
  providers: []
})
export class SharedPipesModule {}
