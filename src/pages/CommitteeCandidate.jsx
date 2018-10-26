import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import {GetCommitteeCandidate, GetBlockProducer} from '../reducers/constant-network/action';

class CommitteeCandidate extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      candidates: [],
      producers: {},
    };
  }

  async componentDidMount() {
    const candidates = await GetCommitteeCandidate();
    if (candidates && candidates.Result) {
      this.setState(
        {
          candidates: candidates.Result,
        },
      );
    }
    console.log(candidates);
    const producers = await GetBlockProducer();
    if (producers && producers.Result) {
      this.setState(
        {
          producers: producers.Result,
        },
      );
    }
    console.log(producers);
  }

  render() {
    const {candidates, producers} = this.state;
    if (!candidates || !producers) {
      return null;
    }
    const {classes} = this.props;
    return <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Committee
        </Typography>
      </div>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h3" component="h2">
                <Icon className={classNames(classes.icon, 'fa fa-cubes')}/> Block Producers
              </Typography>
              <Grid container spacing={40}>
                <Grid item sm={6} md={4} lg={12}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography align="left">
                        <ul>
                          {Object.keys(producers).map((index, key) => (
                            <li key={index}>Chain #{parseInt(key) + 1}: {producers[key]}</li>
                          ))}
                        </ul>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h3" component="h2">
                <Icon className={classNames(classes.icon, 'fa fa-list-alt')}/> Candidates
              </Typography>
              <Grid container spacing={40}>
                <Grid item sm={6} md={4} lg={12}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography align="left">
                        {candidates.length > 0 ? (
                          <ul>
                            {candidates.map((candidate, index) => (
                              <li key={index}>Candidate publickey: {candidate}</li>
                            ))}
                          </ul>
                        ) : (
                          <span style={{textAlign: "center", display: "block"}}>No candidate</span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>;
  }
}

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit * 2,
    display: "contents !important",
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

export default withStyles(styles)(CommitteeCandidate);
