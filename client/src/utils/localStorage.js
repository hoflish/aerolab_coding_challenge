export const loadState = (state = "state") => {
  try {
    const serializeState = window.localStorage.getItem(state);
    return serializeState === null ? undefined : JSON.parse(serializeState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (stateData, stateName) => {
  try {
    let serializeState = JSON.stringify(stateData);
    window.localStorage.setItem(stateName, serializeState);
  } catch (err) {
    console.log(err);
  }
};
