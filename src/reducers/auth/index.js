import { ACTIONS } from './action';
import local from '@/services/local';


const auth = {
  info: () => ({
    isLogged: local.get('auth_logged') || false,
    address: local.get('auth_address') || '',
    token: local.get('auth_token') || '',
  }),
  login: (address, token = '') => {
    local.save('auth_logged', true);
    local.save('auth_address', address);
    local.save('auth_token', token);
  },
  logout: () => {
    local.save('auth_logged', false);
    local.save('auth_address', '');
    local.save('auth_token', '');
  },
  setAddress: (address) => {
    local.save('auth_address', address);
  },
};

export default (state = {
  ...auth.info(),
  isLogging: false,
}, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      auth.login(action.address, action.token);
      return {
        ...state,
        address: action.address,
        token: action.token,
        isLogged: true,
      };
    }

    case ACTIONS.LOGGING_IN: {
      return {
        ...state,
        isLogging: true,
      };
    }

    case ACTIONS.LOGGED_IN: {
      return {
        ...state,
        isLogging: false,
      };
    }

    case ACTIONS.LOGOUT: {
      auth.logout();
      return {
        ...state,
        isLogged: false,
        address: '',
        token: '',
      };
    }

    case ACTIONS.SAVE_ADDRESS: {
      auth.setAddress(action.payload);
      return {
        ...state,
        address: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
