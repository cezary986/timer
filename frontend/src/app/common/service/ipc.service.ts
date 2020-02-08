import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  // tslint:disable-next-line: variable-name
  private _ipc: IpcRenderer | undefined = void 0;

  constructor() {
    if ((window as any).require) {
      try {
        this._ipc = (window as any).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  private on(channel: string, listener: (event: Electron.Event, data: any) => void): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.on(channel, listener);
  }

  private send(channel: string, ...args): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.send(channel, ...args);
  }

  public dispatch<T>(actionType: string, data?: any): Observable<T> {
    const subject: Subject<T> = new Subject();
    this.send(actionType);
    this.on(`${actionType}-CALLBACK`, (event, data: any) => {
      console.log('callback');
      console.log(data);
      
      subject.next(data as unknown as T);
    });
    this.on(`${actionType}-ERROR`, (event) => {
      console.log('error');
      
      subject.error(event);
    });
    return subject;
  }

}
