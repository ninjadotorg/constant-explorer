import axios from 'axios';

export const ACTIONS = {
  CONSTANT_INFO: 'CONSTANT_INFO',
  CONSTANT_INFO_SUCCESS: 'CONSTANT_INFO_SUCCESS',
  CONSTANT_INFO_FAILED: 'CONSTANT_INFO_FAILED',
  CONSTANT_CHAINS: 'CONSTANT_CHAINS',
  CONSTANT_BLOCKS: 'CONSTANT_BLOCKS',
  CONSTANT_BLOCKS_SUCCESS: 'CONSTANT_BLOCKS_SUCCESS',
  CONSTANT_BLOCKS_FAILED: 'CONSTANT_BLOCKS_FAILED',
  CONSTANT_BLOCK: 'CONSTANT_BLOCKS',
  CONSTANT_BLOCK_SUCCESS: 'CONSTANT_BLOCKS_SUCCESS',
  CONSTANT_BLOCK_FAILED: 'CONSTANT_BLOCKS_FAILED',
  CONSTANT_TXS: 'CONSTANT_TXS',
  CONSTANT_TXS_SUCCESS: 'CONSTANT_TXS_SUCCESS',
  CONSTANT_TXS_FAILED: 'CONSTANT_TXS_FAILED',
  CONSTANT_CANDIDATE: 'CONSTANT_CANDIDATE',
  CONSTANT_CANDIDATE_SUCCESS: 'CONSTANT_CANDIDATE_SUCCESS',
  CONSTANT_CANDIDATE_FAILED: 'CONSTANT_CANDIDATE_FAILED',
  CONSTANT_PRODUCER: 'CONSTANT_PRODUCER',
  CONSTANT_PRODUCER_SUCCESS: 'CONSTANT_PRODUCER_SUCCESS',
  CONSTANT_PRODUCER_FAILED: 'CONSTANT_PRODUCER_FAILED',
};

let idRequest = 1;

export const getBlockchainInfo = () => (dispatch) => {
  console.log('Load blockchain information from rpc api');
  dispatch({ type: ACTIONS.CONSTANT_INFO });
  axios.post(`${process.env.internalAPI}`, {
    jsonrpc: '1.0',
    method: 'getblockchaininfo',
    params: '',
    id: idRequest += 1,
  }).then((res) => {
    dispatch({ type: ACTIONS.CONSTANT_INFO_SUCCESS, payload: res.data });
  }).catch((e) => {
    dispatch({ type: ACTIONS.CONSTANT_INFO_FAILED, payload: e });
  });
};

export const getBlocks = chainId => (dispatch) => {
  console.log('Load blocks');
  dispatch({ type: ACTIONS.CONSTANT_BLOCKS });
  axios.post(`${process.env.internalAPI}`, {
    jsonrpc: '1.0',
    method: 'getblocks',
    params: [10, chainId],
    id: idRequest += 1,
  }).then((res) => {
    dispatch({ type: ACTIONS.CONSTANT_BLOCKS_SUCCESS, payload: res.data });
  }).catch((e) => {
    dispatch({ type: ACTIONS.CONSTANT_BLOCKS_FAILED, payload: e });
  });
};

export const getBlock = (chainId, blockHash) => (dispatch) => {
  console.log('Load block');
  dispatch({ type: ACTIONS.CONSTANT_BLOCK });
  axios.post(`${process.env.internalAPI}`, {
    jsonrpc: '1.0',
    method: 'getblock',
    params: [blockHash, chainId],
    id: idRequest += 1,
  }).then((res) => {
    dispatch({ type: ACTIONS.CONSTANT_BLOCK_SUCCESS, payload: res.data });
  }).catch((e) => {
    dispatch({ type: ACTIONS.CONSTANT_BLOCK_FAILED, payload: e });
  });
};

export const getCommitteeCandidate = () => (dispatch) => {
  console.log('Get list commitee candidate');
  dispatch({ type: ACTIONS.CONSTANT_CANDIDATE });
  axios.post(`${process.env.internalAPI}`, {
    jsonrpc: '1.0',
    method: 'getcommitteecandidate',
    params: [],
    id: idRequest += 1,
  }).then((res) => {
    dispatch({ type: ACTIONS.CONSTANT_CANDIDATE_SUCCESS, payload: res.data });
  }).catch((e) => {
    dispatch({ type: ACTIONS.CONSTANT_CANDIDATE_FAILED, payload: e });
  });
};

export const getBlockProducer = () => (dispatch) => {
  console.log('Get list commitee candidate');
  dispatch({ type: ACTIONS.CONSTANT_PRODUCER });
  axios.post(`${process.env.internalAPI}`, {
    jsonrpc: '1.0',
    method: 'getblockproducer',
    params: [],
    id: idRequest += 1,
  }).then((res) => {
    dispatch({ type: ACTIONS.CONSTANT_PRODUCER_SUCCESS, payload: res.data });
  }).catch((e) => {
    dispatch({ type: ACTIONS.CONSTANT_PRODUCER_FAILED, payload: e });
  });
};
