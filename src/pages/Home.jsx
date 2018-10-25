import React from 'react';
import {GetBlockChainInfo} from "../reducers/constant-network/action"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    GetBlockChainInfo();
  }

  render() {
    return <div>Home</div>;
  }
}

export default Home;
