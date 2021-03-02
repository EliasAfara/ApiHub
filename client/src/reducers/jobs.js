import * as actionsType from '../actions/types';

const initialState = [];

const jobs = (state = initialState, action) => {
  const { type, jobs } = action;

  switch (type) {
    case actionsType.SET_JOBS:
      return jobs;

    case actionsType.LOAD_MORE_JOBS:
      return [...state, ...jobs];

    default:
      return state;
  }
};

export default jobs;
