import React from 'react';
import PropTypes from 'prop-types';
import {GetBlockChainInfo} from "../reducers/constant-network/action"
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';

class Home extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      blockChainInfo: {},
    };
  }

  async componentDidMount() {
    let blockchainInfo = await GetBlockChainInfo();
    this.setState({
      blockChainInfo: blockchainInfo,
    });
  }

  render() {
    const {classes} = this.props;
    const {blockChainInfo} = this.state;
    if (!blockChainInfo || !blockChainInfo.Result) {
      return null;
    }
    const chainName = blockChainInfo.Result.ChainName;
    const bestBlocks = blockChainInfo.Result.BestBlocks;

    let totalBlocks = 0;
    Object.values(bestBlocks).forEach(function (block) {
      totalBlocks += block.Height;
    });

    return <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Blockchain Information: {chainName}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Total blocks produced: {totalBlocks}
        </Typography>
      </div>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {
            Object.values(bestBlocks).map((block, index) => (
              <Grid item key={index} sm={6} md={4} lg={6}>
                <Card className={classes.card}>
                  {/*<CardMedia
                    className={classes.cardMedia}
                    image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                    title="Image title"
                  />*/}
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Chain #{index + 1}
                    </Typography>
                    <Typography>
                      <ul>
                        <li>Height: <a href={`/blocks/${index + 1}`}>{block.Height}</a></li>
                        <li>Best block hash: {block.Hash}</li>
                        <li>Best block signature: {block.BlockProducer}</li>
                        <li>Current leader: {block.BlockProducer}</li>
                        <li>Total transactions: {block.TotalTxs}</li>
                        <li>Salary Fund: {block.SalaryFund} constant</li>
                        <li>Current Basic Salary: {block.BasicSalary} constant</li>
                      </ul>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </div>
    </div>;
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

export default withStyles(styles)(Home);
