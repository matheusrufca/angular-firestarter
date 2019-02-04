import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

/// Notify users about errors and other helpful stuff
export interface Msg {
  content: string;
  style: string;
}

@Injectable()
export class NotifyService {
  constructor(private readonly snackBar: MatSnackBar) { }

  notify(message: string, action?: string, settings?: any) {
    settings = Object.assign({ duration: 4000, }, settings || undefined)
    return this.snackBar.open(message, action, settings);
  }


  private _msgSource = new Subject<Msg | null>();

  msg = this._msgSource.asObservable();

  update(content: string, style: 'error' | 'info' | 'success') {
    const msg: Msg = { content, style };
    this._msgSource.next(msg);
  }

  clear() {
    this._msgSource.next(null);
  }
}
