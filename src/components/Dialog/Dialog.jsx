import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { closeDialog } from '@/reducers/app/action';

const styles = {

};

class RootDialog extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.any.isRequired,
    closeText: PropTypes.string,
    onClose: PropTypes.func,
    appCloseDialog: PropTypes.func.isRequired,
  }

  static defaultProps = {
    closeText: 'OK',
    onClose: () => { },
    title: '',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClose = () => {
    const { onClose, appCloseDialog, app } = this.props;
    onClose();
    app.closeDialogFn();
    appCloseDialog();
  }

  render() {
    const {
      title, content: Content, closeText, appCloseDialog, app, ...other
    } = this.props;
    return (
      <Dialog aria-labelledby="login-dialog-title" {...other}>
        {title ? <DialogTitle id="login-dialog-title">{title}</DialogTitle> : ''}
        {typeof Content === 'function' ? <Content /> : ''}
        {
          typeof Content === 'string'
            ? (
              <DialogContent>
                {' '}
                <DialogContentText>{Content}</DialogContentText>
              </DialogContent>
            )
            : ''
        }
        {
          !app.dialogHideCloseButton
            ? (
              <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  {closeText}
                </Button>
              </DialogActions>
            )
            : ''
        }
      </Dialog>
    );
  }
}

export default connect(
  state => ({ app: state.app }), ({ appCloseDialog: closeDialog }),
)(withStyles(styles)(RootDialog));
