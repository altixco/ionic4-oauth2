import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public isDefined(variable: any): Boolean {
    return typeof variable !== 'undefined' && variable !== null;
  }
}
