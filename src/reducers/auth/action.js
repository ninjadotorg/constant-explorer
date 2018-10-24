import { push } from 'connected-react-router';

export const ACTIONS = {
  LOGGING_IN: 'LOGGING_IN',
  LOGGED_IN: 'LOGGED_IN',
  LOGIN: 'AUTH_LOGIN',
  LOGOUT: 'AUTH_LOGOUT',
  SAVE_ADDRESS: 'AUTH_SAVE_ADDRESS',
};

export const login = (address, token) => ({ type: ACTIONS.LOGIN, address, token });
export const logging = () => ({ type: ACTIONS.LOGGING_IN });
export const logged = () => ({ type: ACTIONS.LOGGED_IN });

export const logout = () => (dispatch) => {
  dispatch({ type: ACTIONS.LOGOUT });
  dispatch(push('/login'));
};

export const saveAddress = address => ({ type: ACTIONS.SAVE_ADDRESS, payload: address });
