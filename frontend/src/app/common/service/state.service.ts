import { Injectable } from '@angular/core';
import { IgorService } from 'src/app/igor/igor.service';
import { Observable } from 'rxjs';
import { AppState } from '../models/app-state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public state: AppState = {
    event: null
  };

  private actions = {
    GET_STATE: 'get_state',
    SET_STATE: 'set_state',
  };

  constructor(
    private igorService: IgorService
  ) { }

  public getState(): Observable<AppState> {
    return this.igorService.dispatch<AppState>(this.actions.GET_STATE)
      .pipe((map((state) => {
        if (state !== null) {
          this.state = this.state;
        }
        return state === null ? this.state : state;
      })));
  }

  public setState(state: AppState): Observable<void> {
    return this.igorService.dispatch<void>(this.actions.SET_STATE, state);
  }
}
