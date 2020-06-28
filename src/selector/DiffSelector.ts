import {createSelector} from 'reselect';
import {GlobalState} from '../GlobalState';
import {GlobalStateSelector} from './GlobalStateSelector';

export interface DiffModel<T, ID> {
  id?: ID;
  oldValue?: T;
  newValue: T;
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
            id: diff.id || '',
            oldValue: diff.oldValue,
            newValue: diff.newValue,
          };
          return result;
        }
      }
      const d: DiffModel<T, ID> = {
        newValue: null
      };
      return d;
    }
  );
}
