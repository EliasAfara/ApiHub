import * as actionsType from '../actions/types';

const errors = (state = {}, action) => {
  switch (action.type) {
    case actionsType.SET_ERRORS:
      return {
        error: action.error,
      };

    case actionsType.RESET_ERRORS:
      return {};

    default:
      return state;
  }
};
export default errors;
