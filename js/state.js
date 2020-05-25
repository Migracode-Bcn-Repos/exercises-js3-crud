let state = {
  typeForms: [],
  selectedTypeForm: { id: null },
};

export function useState() {
  return JSON.parse(JSON.stringify(state));
}

export function updateState(newState) {
  state = { ...state, ...newState };
}
