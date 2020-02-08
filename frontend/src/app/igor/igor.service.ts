import { Injectable, Inject, InjectionToken } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { filter, flatMap, first } from 'rxjs/operators';
import { IgorMessage } from './message';
export const IGOR_CONFIG = new InjectionToken<string>('IgorConfig');

export interface IgorConfig {
  serverAddress: string;
  clientId: string;
  maxRetry: number;
}

@Injectable()
export class IgorService {

  private static config: IgorConfig;
  private static websocket: WebSocket;
  private static counter = 0;
  private static initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private static streams = {};

  constructor(@Inject(IGOR_CONFIG) config: IgorConfig) {
    IgorService.config = config;
    this.initialize(config.serverAddress, config.clientId);
  }


  /**
   * Initialize connnection to Igor Server
   *
   * @param serverAddress adress of server with host and port
   * @param clientId id of an application (of your choice), must be unique
   */
  public initialize(serverAddress: string, clientId: string, recursionLevel = 0) {
    if (recursionLevel > 1 && recursionLevel < 3) {
      IgorService.websocket = null;
      setTimeout(() => {
        this.connect(serverAddress, clientId, ++recursionLevel);
      }, 100);
    } else if (recursionLevel < IgorService.config.maxRetry) {
      this.connect(serverAddress, clientId, ++recursionLevel);
    } else {
      throw new Error('Failed to connect to Igor service');
    }
  }

  private connect(serverAddress: string, clientId: string, recursionLevel = 0) {
    if (IgorService.websocket !== null && IgorService.websocket !== undefined && IgorService.websocket.readyState === WebSocket.OPEN) {
      return;
    }
    if (serverAddress[serverAddress.length - 1] !== '/') {
      serverAddress += '/';
    }
    IgorService.websocket = new WebSocket(`${serverAddress}${clientId}`);
    IgorService.websocket.onopen = (event) => {
      recursionLevel = 0;
      IgorService.initialized.next(true);
    };

    IgorService.websocket.onclose = (event) => {
      IgorService.websocket.close();
      IgorService.websocket = undefined;
      this.initialize(serverAddress, clientId, ++recursionLevel);
    };

    IgorService.websocket.onerror  = (event) => {
      console.error(event);
    };

    IgorService.websocket.onmessage = (event) => {
      this.onMessageReceive(JSON.parse(event.data));
      return false;
    };
  }

  private send(sendFunction: () => Observable<any>): Observable<any> {
    return IgorService.initialized
      .pipe(filter(initialized => initialized === true))
      .pipe(first())
      .pipe(flatMap((initialized) => sendFunction()));
  }

  /**
   * Calls certain action on server and returns observable with its 
   * future response
   *
   * @param action action name
   * @param data data payload
   */
  public dispatch<T>(action: string, data = {}): Observable<T> {
    const sendFunction = () => {
      const streamId = this.generateStreamId();
      const resultSubject = new Subject<T>();
      resultSubject.subscribe(
        (res) => { console.log(res); },
        (err) => { console.error(err);
         },
        () => {
          delete IgorService.streams[streamId];
        });

      IgorService.streams[streamId] = resultSubject;
      console.log(data);
      
      IgorService.websocket.send(JSON.stringify({
        streamId,
        action,
        data
      }));
      return resultSubject;
    };
    return this.send(sendFunction);
  }

  /**
   * Returns observable which will fire each time server's process
   * calls certain action on client
   *
   * @param action action name
   */
  public listenToAction<T>(action: string): Observable<T> {
    return IgorService.streams[action];
  }

  private generateStreamId(): string {
    IgorService.counter++;
    // @ts-ignore
    const uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      // tslint:disable-next-line: no-bitwise
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
    return `${uuid.toString(16)}-${IgorService.counter.toString()}`;
  }

  private onMessageReceive(message: IgorMessage) {
    let result = IgorService.streams[message.streamId] as Subject<any>;
    if (result === undefined) {
      IgorService.streams[message.streamId] = new Subject<any>();
      result = IgorService.streams[message.streamId];
    }
    if (message.close) {
      result.complete();
    } else {
      result.next(message.data);
    }
  }
}
