import {createSelector} from 'reselect';
import {GlobalState} from '../GlobalState';
import {ViewGlobalStateSelector} from './ViewGlobalStateSelector';

export class ViewListGlobalStateSelector<G, T> extends ViewGlobalStateSelector<G, T> {
  constructor(formName: string, protected listFormName: string) {
    super(formName);
  }

  selectListData = createSelector<GlobalState<G>, any, T[]>(
    this.selectGlobalState,
    (globalState: G) => {
      if (globalState && globalState[this.listFormName]) {
        return globalState[this.listFormName];
      }
      return [];
    }
  );
}
