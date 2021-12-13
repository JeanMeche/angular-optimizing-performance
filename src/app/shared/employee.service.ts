import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

export interface Command {
  action: 'add' | 'delete';
  department: 'sales' | 'rnd';
}

@Injectable({ providedIn: 'root' })
export class EmployeeService implements OnDestroy {
  private _commands$: WebSocketSubject<Command>;

  constructor() {
    this._commands$ = webSocket('ws://localhost:5555');
  }

  ngOnDestroy() {
    this._commands$.unsubscribe();
  }

  get commands$() {
    return this._commands$;
  }
}
