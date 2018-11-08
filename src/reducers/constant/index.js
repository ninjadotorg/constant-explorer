import { ACTIONS } from './action';

export default (state = {
  chainInfo: { updatedAt: Date.now() },
  chainBlocks: {},
  block: { block: {}, updatedAt: Date.now() },
  txs: { list: [], updatedAt: Date.now() },
  producers: { list: {}, updatedAt: Date.now() },
  candidates: { list: {}, updatedAt: Date.now() },
  tx: {},
}, action) => {
  switch (action.type) {
    case `${ACTIONS.CONSTANT_INFO}_SUCCESS`: {
      return {
        ...state,
        chainInfo: { ...action.payload.Result, updatedAt: Date.now() },
      };
    }
    case `${ACTIONS.CONSTANT_CANDIDATE}_SUCCESS`: {
      return {
        ...state,
        candidates: { list: action.payload.Result, updatedAt: Date.now() },
      };
    }
    case `${ACTIONS.CONSTANT_PRODUCER}_SUCCESS`: {
      return {
        ...state,
        producers: { list: action.payload.Result, updatedAt: Date.now() },
      };
    }
    case `${ACTIONS.CONSTANT_BLOCKS}_SUCCESS`: {
      return {
        ...state,
        chainBlocks: {
          [action.params[1]]: { list: action.payload.Result, updatedAt: Date.now() },
        },
      };
    }
    case `${ACTIONS.CONSTANT_BLOCK}_SUCCESS`: {
      return {
        ...state,
        block: {
          [action.payload.Result.Hash]: { data: action.payload.Result, updatedAt: Date.now() },
        },
      };
    }
    case `${ACTIONS.CONSTANT_TX}_SUCCESS`: {
      return {
        ...state,
        tx: {
          [action.params[0]]: { data: action.payload.Result, updatedAt: Date.now() },
        },
      };
    }
    default: {
      return state;
    }
  }
};
