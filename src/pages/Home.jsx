import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from '@sindresorhus/class-names';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import { getBlockchainInfo } from '@/reducers/constant/action';

class Home extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    actionGetBlockChainInfo: PropTypes.func.isRequired,
    chainInfo: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const { chainInfo } = this.props;

    this.state = {
      chainInfo,
    };

    const { actionGetBlockChainInfo } = this.props;
    actionGetBlockChainInfo();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chainInfo.updatedAt !== prevState.chainInfo.updatedAt) {
      return { chainInfo: nextProps.chainInfo };
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    const { chainInfo } = this.state;
    if (!chainInfo.ChainName) {
      return null;
    }
    const chainName = chainInfo.ChainName;
    const bestBlocks = chainInfo.BestBlocks;

    let totalBlocks = 0;
    Object.values(bestBlocks).forEach((block) => {
      totalBlocks += block.Height;
    });

    return (
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Typography component="h1" align="center" color="textPrimary" gutterBottom>
            Blockchain Information:
            {' '}
            {chainName}
          </Typography>
          <Typography align="center" color="textSecondary" paragraph>
            Total blocks produced:
            {' '}
            {totalBlocks}
          </Typography>
        </div>
        <div className={cn(classes.layout, classes.cardGrid)}>
          <Grid container spacing={40}>
            {
              Object.values(bestBlocks).map((block, index) => (
                <Grid item key={block.Hash} sm={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <div>
                        <Typography gutterBottom component="h2">
                          <Link to={`/chain/${index + 1}`}>{`Chain # ${index + 1}`}</Link>
                        </Typography>
                        <ul>
                          <li>
                            Height:
                            {' '}
                            {block.Height}
                          </li>
                          <li>
                            Best block hash:
                            {' '}
                            <Link to={`/block/${block.Hash}`}>{block.Hash}</Link>
                          </li>
                          <li>
                            Best block signature:
                            {' '}
                            {block.BlockProducer}
                          </li>
                          <li>
                            Current leader:
                            {' '}
                            {block.BlockProducer}
                          </li>
                          <li>
                            Total transactions:
                            {' '}
                            {block.TotalTxs}
                          </li>
                          <li>
                            Salary Fund:
                            {' '}
                            {block.SalaryFund}
                            {' '}
                            constant
                          </li>
                          <li>
                            Current Basic Salary:
                            {' '}
                            {block.BasicSalary}
                            {' '}
                            constant
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
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
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

export default withStyles(styles)(
  connect(
    state => ({
      chainInfo: state.constant.chainInfo,
    }),
    ({
      actionGetBlockChainInfo: getBlockchainInfo,
    }),
  )(Home),
);
