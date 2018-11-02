import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

class Txs extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const { match } = this.props;
    const { blockHash } = match.params;

    this.state = {
      blockHash,
      chainId: '1',
    };
  }

  render() {
    const { blockHash } = this.state;

    return (
      <div className="txs-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Card>
                <CardContent>
                  Transaction of block:
                  {' '}
                  <Link to={`/block/${blockHash}`}><strong>{blockHash}</strong></Link>
                </CardContent>
              </Card>
              <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
                <CardContent>
                  <Typography>
                    List of txs
                    <div>
                      <ul>
                        <li>
                          <Link to="/tx/000000">000000</Link>
                        </li>
                        <li>
                          <Link to="/tx/000000">000000</Link>
                        </li>
                        <li>
                          <Link to="/tx/000000">000000</Link>
                        </li>
                        <li>
                          <Link to="/tx/000000">000000</Link>
                        </li>
                        <li>
                          <Link to="/tx/000000">000000</Link>
                        </li>
                        <li>
                          <Link to="/tx/000000">000000</Link>
                        </li>
                        <li>
                          <Link to="/tx/000000">000000</Link>
                        </li>
                        <li>
                          <Link to="/tx/000000">000000</Link>
                        </li>
                        <li>
                          <Link to="/tx/000000">000000</Link>
                        </li>
                        <li>
                          <Link to="/tx/000000">000000</Link>
                        </li>
                      </ul>
                    </div>
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

export default Txs;
