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
      (add)="salesList = add(salesList, $event)"
      (remove)="salesList = remove(salesList, $event)"
    ></app-employee-list>

    <app-employee-list
      [data]="rndList"
      department="R&D"
      (add)="rndList = add(rndList, $event)"
      (remove)="rndList = remove(rndList, $event)"
    ></app-employee-list>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  salesList!: List<EmployeeData>;
  rndList!: List<EmployeeData>;
  label!: string;

  constructor(private generator: ListGenerator, private service: EmployeeService) { }

  ngOnInit() {
    this.salesList = List(Sales);
    this.rndList = List(Rnd);

    this.service.commands$.pipe(bufferTime(2000)).subscribe(c => this.handleCommands(c));
  }

  add(list: List<EmployeeData>, name: string) {
    return list.unshift({ label: name, num: this.generator.generateNumber(NumRange) });
  }

  remove(list: List<EmployeeData>, node: EmployeeData) {
    return list.splice(list.indexOf(node), 1);
  }

  private handleCommand(m: Command) {
    let list: 'rndList' | 'salesList' = 'rndList';
    if (m.department === 'sales') {
      list = 'salesList';
    }

    if (m.action === 'add') {
      this[list] = this.add(this[list], this.generator.generateLabel(Names));
    } else {
      this[list] = this.remove(this[list], (this[list].get(Math.floor(Math.random() * this[list].size))!));
    }
  }

  private handleCommands(m: Array<Command>) {
    m.forEach((c) => this.handleCommand(c));
  }
}
