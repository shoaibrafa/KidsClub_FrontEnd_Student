import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  component_name: string = '';
  
  success_alert: boolean = false;
  failure_alert: boolean = false;

  constructor() { }

  update_component_name(value: string): void {
    this.component_name = value;
  }
}
