import {createSelector} from 'reselect';
import {GlobalState} from '../GlobalState';
import {ViewListGlobalStateSelector} from './ViewListGlobalStateSelector';

export interface DiffModel<T, ID> {
  id?: ID;
  origin?: T;
  value: T;
}

export class ViewListDiffGlobalStateSelector<G, T, ID> extends ViewListGlobalStateSelector<G, T> {
  constructor(formName: string, listFormName: string, protected diffFormName: string) {
    super(formName, listFormName);
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
