import { ACTIONS } from './action';

export default (state = {
  chainInfo: { updatedAt: Date.now() },
  chains: { list: [], updatedAt: Date.now() },
  blocks: { list: [], updatedAt: Date.now() },
  txs: { list: [], updatedAt: Date.now() },
  producers: { list: {}, updatedAt: Date.now() },
  candidates: { list: {}, updatedAt: Date.now() },
}, action) => {
  switch (action.type) {
    case ACTIONS.CONSTANT_INFO_SUCCESS: {
      return {
        ...state,
        chainInfo: { ...action.payload.Result, updatedAt: Date.now() },
      };
    }
    case ACTIONS.CONSTANT_CANDIDATE_SUCCESS: {
      return {
        ...state,
        candidates: { list: action.payload.Result, updatedAt: Date.now() },
      };
    }
    case ACTIONS.CONSTANT_PRODUCER_SUCCESS: {
      return {
        ...state,
        producers: { list: action.payload.Result, updatedAt: Date.now() },
      };
    }
    default: {
      return state;
    }
  }
};
