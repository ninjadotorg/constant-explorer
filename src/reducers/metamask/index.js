import { ACTIONS } from './action';

export default (state = {
  installed: false,
  detecting: false,
  unlocked: false,
  address: '',
  web3: {},
}, action) => {
  switch (action.type) {
    case ACTIONS.METAMASK_DETECTING: {
      return {
        ...state,
        detecting: true,
      };
    }
    case ACTIONS.METAMASK_DETECTED: {
      return {
        ...state,
        detecting: false,
        web3: action.web3,
      };
    }
    case ACTIONS.METAMASK_UNLOCKED: {
      return {
        ...state,
        unlocked: true,
        address: action.address,
      };
    }
    default: {
      return state;
    }
  }
};
