import { Component, OnInit } from '@angular/core';

import { ListGenerator, EmployeeData } from './shared/list-generator.service';
import { Names } from './shared/names';

import { Rnd } from './data/rnd-70-27-30';
import { Sales } from './data/sales-70-27-30';
import { List } from 'immutable';
import { Command, EmployeeService } from './shared/employee.service';
import { bufferTime } from 'rxjs';

const NumRange: [number, number] = [29, 32];

@Component({
  selector: 'sd-app',
  template: `
    <app-employee-list
      [data]="salesList"
      department="Sales"
      (add)="add(salesList, $event)"
      (remove)="remove(salesList, $event)"
    ></app-employee-list>

    <app-employee-list
      [data]="rndList"
      department="R&D"
      (add)="add(rndList, $event)"
      (remove)="remove(rndList, $event)"
    ></app-employee-list>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  salesList!: Array<EmployeeData>;
  rndList!: Array<EmployeeData>;
  label!: string;

  constructor(private generator: ListGenerator, private service: EmployeeService) { }

  ngOnInit() {
    this.salesList = Sales;
    this.rndList = Rnd;

    // this.service.commands$.pipe().subscribe(c => this.handleCommands(c));
  }

  add(list: Array<EmployeeData>, name: string) {
    list.unshift({ label: name, num: this.generator.generateNumber(NumRange) });
  }

  remove(list: Array<EmployeeData>, node: EmployeeData) {
    list.splice(list.indexOf(node), 1);
  }

  // private handleCommand(m: Command) {
  //   let list: 'rndList' | 'salesList' = 'rndList';
  //   if (m.department === 'sales') {
  //     list = 'salesList';
  //   }

  //   if (m.action === 'add') {
  //     this[list] = this.add(this[list], this.generator.generateLabel(Names));
  //   } else {
  //     this[list] = this.remove(this[list], (this[list].get(Math.floor(Math.random() * this[list].size))!));
  //   }
  // }

  // private handleCommands(m: Array<Command>) {
  //   m.forEach((c) => this.handleCommand(c));
  // }
}
