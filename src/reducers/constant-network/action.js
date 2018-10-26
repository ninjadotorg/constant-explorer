import axios from 'axios';

export const GetBlockChainInfo = async () => {
  console.log("Load blockchain information from rpc api");
  const resp = await axios.post(`${process.env.internalAPI}`, {
    jsonrpc: "1.0",
    method: "getblockchaininfo",
    params: "",
    id: 1
  });
  if (resp.status == 200) {
    return resp.data;
  } else {
    return null;
  }
}

export const GetBlocks = async (chainID) => {
  console.log("Load blocks from rpc api from chain:" + chainID);
  const resp = await axios.post(`${process.env.internalAPI}`, {
    jsonrpc: "1.0",
    method: "getblocks",
    params: [10, chainID],
    id: 1,
  });
  if (resp.status == 200) {
    return resp.data;
  } else {
    return null;
  }
}

export const GetCommitteeCandidate = async () => {
  console.log('Get list commitee candidate');
  const resp = await axios.post(`${process.env.internalAPI}`, {
    jsonrpc: "1.0",
    method: "getcommitteecandidate",
    params: [],
    id: 1,
  });
  if (resp.status == 200) {
    return resp.data;
  } else {
    return null;
  }
}

export const GetBlockProducer = async () => {
  console.log('Get list commitee candidate');
  const resp = await axios.post(`${process.env.internalAPI}`, {
    jsonrpc: "1.0",
    method: "getblockproducer",
    params: [],
    id: 1,
  });
  if (resp.status == 200) {
    return resp.data;
  } else {
    return null;
  }
}
