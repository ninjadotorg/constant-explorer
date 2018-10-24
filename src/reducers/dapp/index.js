import { ACTIONS } from './action';

export default (state = {
  isSubmitting: false,
}, action) => {
  switch (action.type) {
    case ACTIONS.DAPP_SUBMIT: {
      return {
        ...state,
        isSubmitting: true,
      };
    }
    case ACTIONS.DAPP_SUBMITTED_SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
      };
    }
    case ACTIONS.DAPP_SUBMITTED_ERROR: {
      return {
        ...state,
        isSubmitting: false,
      };
    }
    default: {
      return state;
    }
  }
};
