import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import cn from '@sindresorhus/class-names';
import Icon from '@material-ui/core/Icon';
import { getCommitteeCandidate, getBlockProducer } from '@/reducers/constant/action';

class CommitteeCandidate extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    producers: PropTypes.object.isRequired,
    candidates: PropTypes.object.isRequired,
    actionGetBlockProducer: PropTypes.func.isRequired,
    actionGetCommitteeCandidate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      producers: props.producers,
      candidates: props.candidates,
    };
  }

  componentDidMount() {
    const { actionGetBlockProducer, actionGetCommitteeCandidate } = this.props;
    actionGetBlockProducer();
    actionGetCommitteeCandidate();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.producers.updatedAt !== prevState.producers.updatedAt) {
      return { producers: nextProps.producers };
    }
    if (nextProps.candidates.updatedAt !== prevState.candidates.updatedAt) {
      return { candidates: nextProps.candidates };
    }
    return null;
  }

  render() {
    const { candidates, producers } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Typography component="h1" align="center" color="textPrimary" gutterBottom>
            Committee
          </Typography>
        </div>
        <div className={cn(classes.layout, classes.cardGrid)}>
          <Grid container spacing={40}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography gutterBottom component="h2">
                  <Icon className={cn(classes.icon, 'fa fa-cubes')} />
                  {' '}
                  Block Producers
                </Typography>
                <Grid container spacing={40}>
                  <Grid item sm={6} md={4} lg={12}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        {
                          !isEmpty(producers.list)
                            ? (
                              <ul>
                                {Object.keys(producers.list).map((index, key) => (
                                  <li key={index}>
                                    Chain #
                                    <Link to={`/chain/${parseInt(key, 10) + 1}`}>{parseInt(key, 10) + 1}</Link>
                                    :
                                    {' '}
                                    {producers.list[index]}
                                  </li>
                                ))}
                              </ul>
                            )
                            : (
                              <span style={{ textAlign: 'center', display: 'block' }}>No producers</span>
                            )
                        }
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography gutterBottom component="h2">
                  <Icon className={cn(classes.icon, 'fa fa-list-alt')} />
                  {' '}
                  Candidates
                </Typography>
                <Grid container spacing={40}>
                  <Grid item sm={6} md={4} lg={12}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography align="left">
                          {
                            !isEmpty(candidates.list)
                              ? (
                                <ul>
                                  {Object.keys(candidates.list).map((index, key) => (
                                    <li key={index}>
                                      Chain #
                                      {parseInt(key, 10) + 1}
                                      :
                                      {' '}
                                      {candidates.list[index]}
                                    </li>
                                  ))}
                                </ul>
                              )
                              : (
                                <span style={{ textAlign: 'center', display: 'block' }}>No candidate</span>
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
      producers: state.constant.producers,
      candidates: state.constant.candidates,
    }),
    ({
      actionGetBlockProducer: getBlockProducer,
      actionGetCommitteeCandidate: getCommitteeCandidate,
    }),
  )(CommitteeCandidate),
);
