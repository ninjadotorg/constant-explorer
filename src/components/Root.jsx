import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from '@/components/Router';
import RootDialog from '@/components/Dialog/Dialog';
import { withRouter } from 'react-router-dom';

class Root extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { app } = this.props;
    return (
      <>
        <RootDialog
          open={app.showDialog}
          title={app.dialogTitle}
          content={app.dialogContent}
          onClose={app.closeDialogFn}
        />
        <Router />
      </>
    );
  }
}

export default withRouter(connect(state => ({ app: state.app }))(Root));
