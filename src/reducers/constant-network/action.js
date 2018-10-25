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
