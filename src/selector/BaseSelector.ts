import {Selector} from 'reselect';
import {ReduxState} from '../GlobalState';
import {GlobalStateSelector} from './GlobalStateSelector';

export class BaseSelector<G, F> extends GlobalStateSelector<G> {
  protected selectFormDataState: Selector<ReduxState<G, F>, F> = (state: ReduxState<G, F>) => state.formDataState;
}
