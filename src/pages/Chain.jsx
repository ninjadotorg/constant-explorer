import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import cn from '@sindresorhus/class-names';
import Icon from '@material-ui/core/Icon';
import { getBlocks } from '@/reducers/constant/action';
import { Link } from 'react-router-dom';

function timeConverter(UNIXTimestamp) {
  const a = new Date(UNIXTimestamp * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = `0${a.getMinutes()}`;
  const sec = `0${a.getSeconds()}`;
  const time = `${date} ${month} ${year} ${hour}:${min.substr(-2)}:${sec.substr(-2)}`;
  return time;
}

class Chain extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired,
    actionGetBlocks: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const { match } = this.props;
    const { chainId } = match.params;
    const rawchainId = chainId - 1;

    this.state = {
      blocks: props.blocks,
      chainId,
      rawchainId,
    };

    const { actionGetBlocks } = this.props;
    actionGetBlocks(rawchainId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.blocks[prevState.rawchainId] ?.updatedAt
        !== prevState.blocks[prevState.rawchainId] ?.updatedAt
    ) {
      return { blocks: nextProps.blocks };
    }
    return null;
  }

  renderBlocks = (blockArrays) => {
    const { classes } = this.props;
    return (
      blockArrays.map(block => (
        <Grid item key={block.Hash} sm={6} md={4} lg={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography align="left" component="h6">
                Block
                {' '}
                {block.Height}
              </Typography>
              <ul style={{ textAlign: 'left' }}>
                <li>
                  Block hash:
                  {' '}
                  <Link to={`/block/${block.Hash}`}>{block.Hash}</Link>
                </li>
                <li>
                  Block signature:
                  {' '}
                  {block.BlockProducer}
                </li>
                <li>
                  Mined by
                  {' '}
                  {block.BlockProducer}
                </li>
                <li>
                  Total transactions:
                  {' '}
                  {block.TxHashes.length}
                </li>
                <li>
                  Time:
                  {' '}
                  {timeConverter(block.Time)}
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      ))
    );
  }

  render() {
    const { blocks, chainId, rawchainId } = this.state;
    const { classes } = this.props;

    const blockArrays = blocks[rawchainId] ?.list || [];

    return (
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Typography component="h1" align="center" color="textPrimary" gutterBottom>
            {`Chain #${chainId}`}
          </Typography>
        </div>
        <div className={cn(classes.layout, classes.cardGrid)}>
          <Grid container spacing={40}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography gutterBottom component="h2">
                  <Icon className={cn(classes.icon, 'fa fa-cubes')} />
                  {' '}
                  Blocks
                </Typography>
                <Grid container spacing={40}>
                  {
                    blockArrays && blockArrays.length
                      ? this.renderBlocks(blockArrays)
                      : ''
                  }
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography gutterBottom component="h2">
                  <Icon className={cn(classes.icon, 'fa fa-list-alt')} />
                  {' '}
                  Transactions
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit * 2,
    display: 'contents !important',
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(
  connect(
    state => ({
      blocks: state.constant.chainBlocks,
    }),
    ({
      actionGetBlocks: getBlocks,
    }),
  )(Chain),
);
