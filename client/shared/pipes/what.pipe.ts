import { Pipe, PipeTransform } from '@angular/core';

const what = {
  "ants": "Ants",
  "bedbugs": "Bed bugs",
  "cockroaches": "Cockroaches",
  "fleas": "Fleas",
  "flies": "Flies",
  "rodents": "Mice/Rats",
  "mosquitos": "Mosquitos",
  "other": "Other..."
};

/**
 * Returns localized pest name for what field.
 */
@Pipe({
  name: 'what'
})
export class WhatPipe implements PipeTransform {
  transform(value: string): string {
    return what[value];
  }
}
