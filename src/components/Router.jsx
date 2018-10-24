import React from 'react';
// import PropTypes from 'prop-types';
import { createDynamicImport } from '@/services/app';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';

const Home = createDynamicImport(() => import('@/pages/Home'), Loading);
const Page1 = createDynamicImport(() => import('@/pages/Page1'), Loading);
const Page2 = createDynamicImport(() => import('@/pages/Page2'), Loading);
const Login = createDynamicImport(() => import('@/pages/Page1'), Loading);
const Submit = createDynamicImport(() => import('@/pages/Page1'), Loading);

const routers = [
  { path: '/', exact: true, component: Home },
  { path: '/page1', component: Page1 },
  { path: '/page2', component: Page2 },
  { path: '/page2/:address', component: Page2 },
];

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { auth } = this.props;
    return (
      <Switch>
        {
          routers.map(route => (
            <Route key={route.path} {...route} />
          ))
        }
        {auth.isLogged ? <Redirect from="/login" to={`/profile/${auth.address}`} exact /> : <Route path="/login" component={Login} />}
        {!auth.isLogged ? <Redirect from="/submit" to="/login" exact /> : <Route path="/submit" component={Submit} />}
      </Switch>
    );
  }
}

export default withRouter(connect(state => ({ auth: state.auth }), null)(Router));
