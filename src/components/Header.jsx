import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import cn from '@sindresorhus/class-names';
import { showDialog } from '@/reducers/app/action';

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    appShowDialog: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  closeDialog = () => {
    const { dispatch } = this.props;
    dispatch(push('/login'));
  }

  clickHeaderSubmit = () => {
    const { auth, dispatch, appShowDialog } = this.props;
    if (auth.isLogged) {
      dispatch(push('/submit'));
    } else {
      dispatch(appShowDialog('You must login before submit a proposal', this.closeDialog));
    }
  }

  render() {
    const { classes, auth } = this.props;

    return (
      <header className="header">
        <div className="uk-container">
          <div className="row">
            <div className={cn(classes.logoContainer, 'logo-container')}>
              <Link to="/">Constant explorer</Link>
            </div>
            <div className={classes.searchBar}>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <Input
                  placeholder="Search..."
                  disableUnderline
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </div>
            <div className={cn('header-menu-bar', classes.menuBar)}>
              <ul>
                <li>
                  <Link to="/page1">Page1</Link>
                </li>
                <li>
                  <Link to="/page2">Page2</Link>
                </li>
                <li>
                  {!auth.isLogged ? <Link to="/login">Login</Link> : <Link to={`/profile/${auth.address}`}>Profile</Link>}
                </li>
              </ul>
              <Button className="button-app-1" onClick={this.clickHeaderSubmit}>
                Button
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const styles = theme => ({
  root: {

  },
  logoContainer: {
    textTransform: 'uppercase',
    letterSpacing: '3.1px',
    fontSize: '18px',
    fontWeight: '300',
    padding: '0 30px 0 0',
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: 0, // theme.shape.borderRadius,
    backgroundColor: '#FAFAFA',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: 120,
    [theme.breakpoints.up('lg')]: {
      '&:focus': {
        width: 200,
      },
    },
  },
  menuBar: {
    float: 'right',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});

export default connect(
  state => ({ auth: state.auth }),
  dispatch => ({ appShowDialog: showDialog, dispatch }),
)(withStyles(styles)(Header));
