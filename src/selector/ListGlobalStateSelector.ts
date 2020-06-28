import {createSelector} from 'reselect';
import {GlobalState} from '../GlobalState';
import {GlobalStateSelector} from './GlobalStateSelector';

export class ListGlobalStateSelector<G, T> extends GlobalStateSelector<G> {
  constructor(protected listFormName: string) {
    super();
  }

  public selectListData = createSelector<GlobalState<G>, any, T[]>(
    this.selectGlobalState,
    (globalState: G) => {
      if (globalState && globalState[this.listFormName]) {
        return globalState[this.listFormName];
      }
      return [];
    }
  );
}
