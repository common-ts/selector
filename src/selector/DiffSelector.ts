import {createSelector} from 'reselect';
import {GlobalState} from '../GlobalState';
import {GlobalStateSelector} from './GlobalStateSelector';

export interface DiffModel<T, ID> {
  id?: ID;
  origin?: T;
  value: T;
}

export class DiffSelector<G, T, ID> extends GlobalStateSelector<G> {
  constructor(protected diffFormName: string) {
    super();
  }

  public selectDiff = createSelector<GlobalState<G>, any, DiffModel<T, ID>>(
    this.selectGlobalState,
    (globalState: any) => {
      if (globalState) {
        const diff = globalState[this.diffFormName];
        if (diff) {
          const result = {
            origin: diff.origin,
            value: diff.value,
          };
          return result;
        }
      }
      const d: DiffModel<T, ID> = {
        value: null
      };
      return d;
    }
  );
}
