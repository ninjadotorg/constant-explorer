import React from 'react';
// import PropTypes from 'prop-types';
import { createDynamicImport } from '@/services/app';
import {
  Switch,
  Route,
  withRouter,
  // Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';

const Home = createDynamicImport(() => import('@/pages/Home'), Loading);
const Chain = createDynamicImport(() => import('@/pages/Chain'), Loading);
const Blocks = createDynamicImport(() => import('@/pages/Blocks'), Loading);
const Block = createDynamicImport(() => import('@/pages/Block'), Loading);
const Committees = createDynamicImport(() => import('@/pages/Committees'), Loading);
const Txs = createDynamicImport(() => import('@/pages/Txs'), Loading);
const Tx = createDynamicImport(() => import('@/pages/Tx'), Loading);
const Tokens = createDynamicImport(() => import('@/pages/Tokens'), Loading);
const Token = createDynamicImport(() => import('@/pages/Token'), Loading);

const routers = [
  { path: '/', exact: true, component: Home },
  { path: '/chain/:chainId/blocks', exact: true, component: Blocks },
  { path: '/chain/:chainId', exact: true, component: Chain },
  { path: '/block/:blockHash', exact: true, component: Block },
  { path: '/block/:blockHash/txs', exact: true, component: Txs },
  { path: '/txs', exact: true, component: Txs },
  { path: '/txs/pending', exact: true, component: Txs },
  { path: '/txs/voting', exact: true, component: Txs },
  { path: '/txs/bond', exact: true, component: Txs },
  { path: '/txs/gov-token', exact: true, component: Txs },
  { path: '/txs/bank-token', exact: true, component: Txs },
  { path: '/txs/custom-token', exact: true, component: Txs },
  { path: '/tx/:txHash', exact: true, component: Tx },
  { path: '/tokens', exact: true, component: Tokens },
  { path: '/token/:customTokenId', exact: true, component: Token },
  { path: '/committees', exact: true, component: Committees },
];

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        {
          routers.map(route => (
            <Route key={route.path} {...route} />
          ))
        }
      </Switch>
    );
  }
}

export default withRouter(connect(state => ({ auth: state.auth }), null)(Router));
