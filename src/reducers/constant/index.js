import { ACTIONS } from './action';

export default (state = {
  chainInfo: { updatedAt: Date.now(), inited: false },
  chainBlocks: {},
  txs: { list: [], updatedAt: Date.now() },
  producers: { list: {}, updatedAt: Date.now() },
  candidates: { list: {}, updatedAt: Date.now() },
  block: {},
  tx: {},
  txPending: {},
  token: {},
  search: { keyword: '', success: '', updatedAt: Date.now() },
  mempool: { info: {}, updatedAt: Date.now(), inited: false },
  tokens: { list: [], updatedAt: Date.now(), inited: false },
}, action) => {
  switch (action.type) {
    // search
    case `${ACTIONS.CONSTANT_CHECKHASH}_SUCCESS`: {
      let success = '';
      if (action.payload.Result.IsBlock) {
        success = 'block';
      }
      if (action.payload.Result.IsTransaction) {
        success = 'tx';
      }
      return {
        ...state,
        search: { keyword: action.params[0], success, updatedAt: Date.now() },
      };
    }
    case `${ACTIONS.CONSTANT_CHECKHASH}_FAILED`: {
      return {
        ...state,
        search: { keyword: action.params[0], success: '', updatedAt: Date.now() },
      };
    }
    case 'CLEAR_SEARCH': {
      return {
        ...state,
        search: { keyword: '', success: '', updatedAt: Date.now() },
      };
    }
    // main info
    case `${ACTIONS.CONSTANT_INFO}_SUCCESS`: {
      return {
        ...state,
        chainInfo: { ...action.payload.Result, updatedAt: Date.now(), inited: true },
      };
    }
    // mempool info
    case `${ACTIONS.CONSTANT_MEMPOOL}_SUCCESS`: {
      return {
        ...state,
        mempool: { info: action.payload.Result, updatedAt: Date.now(), inited: true },
      };
    }
    // committees
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
    // blocks of chain
    case `${ACTIONS.CONSTANT_BLOCKS}_SUCCESS`: {
      return {
        ...state,
        chainBlocks: {
          [action.params[1]]: { list: action.payload.Result, updatedAt: Date.now() },
        },
      };
    }
    // block info
    case `${ACTIONS.CONSTANT_BLOCK}_SUCCESS`: {
      return {
        ...state,
        block: {
          [action.params[0]]: { data: action.payload.Result, updatedAt: Date.now() },
        },
      };
    }
    // tx info
    case `${ACTIONS.CONSTANT_TX}_SUCCESS`: {
      return {
        ...state,
        tx: {
          [action.params[0]]: { data: action.payload.Result, updatedAt: Date.now() },
        },
      };
    }
    // tx info
    case `${ACTIONS.CONSTANT_TOKEN}_SUCCESS`: {
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
