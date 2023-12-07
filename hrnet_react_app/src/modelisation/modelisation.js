import states from "../utils/states";

export function getAbbreviationFromState(state) {
    const stateEntry = states.find((entry) => entry.name === state);
    return stateEntry ? stateEntry.abbreviation : null;
  }
