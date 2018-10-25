import React from 'react';
import PropTypes from 'prop-types';
import {GetBlocks} from "../reducers/constant-network/action";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

class Blocks extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      blocks: {},
      chainID: -1,
    };
  }

  async componentDidMount() {
    const {match} = this.props;
    const {chainID} = match.params;
    console.log("ChainID:" + (chainID - 1));

    let blocks = await GetBlocks(chainID - 1);
    console.log(blocks)
    this.setState({
      blocks: blocks,
      chainID: chainID,
    });
  }

  render() {
    const {blocks, chainID} = this.state;
    if (!blocks || !blocks.Result) {
      return null;
    }
    const blockArrays = blocks.Result;
    const {classes} = this.props;
    return <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Chain #{chainID}
        </Typography>
      </div>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h3" component="h2">
                Blocks
              </Typography>
              <Grid container spacing={40}>
                {
                  blockArrays.map((block, index) => (
                    <Grid item key={index} sm={6} md={4} lg={12}>
                      <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                          <Typography align="left" variant="h6" component="h6">
                            Block {block.Height}
                          </Typography>
                          <Typography align="left">
                            <ul>
                              <li>Block hash: {block.Hash}</li>
                              <li>Block signature: {block.BlockProducer}</li>
                              <li>Mined by {block.BlockProducer}</li>
                              <li>Total transactions: {block.TxHashes.length}</li>
                            </ul>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                }
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h3" component="h2">
                Transactions
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>;
  }
}

const styles = theme => ({
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

export default withStyles(styles)(Blocks);
