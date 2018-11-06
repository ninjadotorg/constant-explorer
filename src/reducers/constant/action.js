import axios from 'axios';

export const ACTIONS = {
  CONSTANT_INFO: 'CONSTANT_INFO',
  CONSTANT_BLOCKS: 'CONSTANT_BLOCKS',
  CONSTANT_BLOCK: 'CONSTANT_BLOCK',
  CONSTANT_TX: 'CONSTANT_TX',
  CONSTANT_CANDIDATE: 'CONSTANT_CANDIDATE',
  CONSTANT_PRODUCER: 'CONSTANT_PRODUCER',
};

let idRequest = 1;

const createRPCRequest = (actionName, method, params) => (dispatch) => {
  dispatch({ type: actionName });
  axios.post(`${process.env.internalAPI}`, {
    jsonrpc: '1.0',
    method,
    params,
    id: idRequest += 1,
  }).then((res) => {
    dispatch({ type: `${actionName}_SUCCESS`, payload: res.data, id: idRequest });
  }).catch((e) => {
    dispatch({ type: `${actionName}_FAILED`, payload: e, id: idRequest });
  });
};

export const getBlockchainInfo = () => createRPCRequest(ACTIONS.CONSTANT_INFO, 'getblockchaininfo', '');
export const getBlocks = chainId => createRPCRequest(ACTIONS.CONSTANT_BLOCKS, 'getblocks', [10, chainId]);
export const getBlock = blockHash => createRPCRequest(ACTIONS.CONSTANT_BLOCK, 'retrieveblock', [blockHash, '2']);
export const getCommitteeCandidate = () => createRPCRequest(ACTIONS.CONSTANT_CANDIDATE, 'getcommitteecandidate', []);
export const getBlockProducer = () => createRPCRequest(ACTIONS.CONSTANT_PRODUCER, 'getblockproducer', []);
