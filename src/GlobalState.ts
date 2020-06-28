export interface GlobalState<G> {
  globalState: G;
}

export interface ReduxState<G, F> extends GlobalState<G> {
  form: any;
  formDataState: F;
}
