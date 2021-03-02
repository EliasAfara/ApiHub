import { SET_ERRORS, RESET_ERRORS } from './types';
// Added action creator functions which we be called to dispatch actions to the reducer

export const setErrors = (error) => ({
  type: SET_ERRORS,
  error,
});

export const resetErrors = () => (dispatch) => {
  dispatch({
    type: RESET_ERRORS,
  });
};
