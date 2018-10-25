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
