import React from 'react';
// import PropTypes from 'prop-types';
import {createDynamicImport} from '@/services/app';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from './Loading';

const Home = createDynamicImport(() => import('@/pages/Home'), Loading);
const Blocks = createDynamicImport(() => import('@/pages/Blocks'), Loading);
const CommitteeCandidate = createDynamicImport(() => import('@/pages/CommitteeCandidate'), Loading);

const routers = [
  {path: '/', exact: true, component: Home},
  {path: '/blocks/:chainID', component: Blocks},
  {path: '/committee/', component: CommitteeCandidate},
];

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {auth} = this.props;
    return (
      <Switch>
        {
          routers.map(route => (
            <Route key={route.path} {...route} />
          ))
        }
        {/*{auth.isLogged ? <Redirect from="/login" to={`/profile/${auth.address}`} exact/> :*/}
        {/*<Route path="/login" component={Login}/>}*/}
        {/*{!auth.isLogged ? <Redirect from="/submit" to="/login" exact/> : <Route path="/submit" component={Submit}/>}*/}
      </Switch>
    );
  }
}

export default withRouter(connect(state => ({auth: state.auth}), null)(Router));
