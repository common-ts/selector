/*
export * from './GlobalState';
export * from './selector/BaseSelector';
export * from './selector/GlobalStateSelector';
export * from './selector/ViewGlobalStateSelector';
export * from './selector/ListGlobalStateSelector';
export * from './selector/DiffSelector';
export * from './selector/ViewListGlobalStateSelector';
export * from './selector/ViewListDiffGlobalStateSelector';
*/
import {createSelector, Selector} from 'reselect';

export interface GlobalState<G> {
  globalState: G;
}

export interface ReduxState<G, F> extends GlobalState<G> {
  form: any;
  formDataState: F;
}

export interface DiffModel<T, ID> {
  id?: ID;
  origin?: T;
  value: T;
}

export class GlobalStateSelector<G> {
  protected selectGlobalState: Selector<GlobalState<G>, G> = (state: GlobalState<G>) => state.globalState || {} as G;
}

export class BaseSelector<G, F> extends GlobalStateSelector<G> {
  protected selectFormDataState: Selector<ReduxState<G, F>, F> = (state: ReduxState<G, F>) => state.formDataState;
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

export class ViewGlobalStateSelector<G, T> extends GlobalStateSelector<G> {
  constructor(protected formName: string) {
    super();
  }

  selectFormData = createSelector<GlobalState<G>, G, T>(
    this.selectGlobalState,
    (globalState: G) => {
      if (globalState && globalState[this.formName]) {
        return globalState[this.formName];
      }
      return this.createModel();
    }
  );

  protected createModel(): T {
    const model: any = {};
    return model;
  }
}

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
