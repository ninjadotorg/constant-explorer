import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

class Tx extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const { match } = this.props;
    const { txHash } = match.params;

    this.state = {
      txHash,
    };
  }

  render() {
    const { txHash } = this.state;

    return (
      <div className="tx-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Card>
                <CardContent>
                  Tx:
                  {' '}
                  {txHash}
                </CardContent>
              </Card>
              <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
                <CardContent>
                  <Typography>
                    Tx information:

                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tx;
