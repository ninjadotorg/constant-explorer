import { internalAPI } from '@/reducers/app/action';

export const ACTIONS = {
  DAPP_SUBMIT: 'DAPP_SUBMIT',
  DAPP_SUBMITTED_SUCCESS: 'DAPP_SUBMITTED_SUCCESS',
  DAPP_SUBMITTED_ERROR: 'DAPP_SUBMITTED_ERROR',
};


export const submitDapp = data => (dispatch) => {
  dispatch({ type: ACTIONS.DAPP_SUBMIT });
  internalAPI({
    path: '/dapp/create',
    method: 'POST',
    data,
    successFn: () => {
      dispatch({ type: ACTIONS.DAPP_SUBMITTED_SUCCESS });
    },
    errorFn: () => {
      dispatch({ type: ACTIONS.DAPP_SUBMITTED_ERROR });
    },
  });
};
