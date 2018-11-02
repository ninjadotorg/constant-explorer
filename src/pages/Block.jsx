import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

class Block extends React.Component {
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
    const { blockHash, chainId } = this.state;
    return (
      <div className="block-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Card>
                <CardContent>
                  Block:
                  {' '}
                  <strong>{blockHash}</strong>
                </CardContent>
              </Card>
              <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
                <CardContent>
                  <Typography>
                    Block information
                    <div>
                      <ul>
                        <li>
                          ChainID:
                          {' '}
                          <Link to={`/chain/${chainId}`}>{`${chainId}`}</Link>
                        </li>
                        <li>Confirmations: 0</li>
                        <li>Height: 1</li>
                        <li>Version: 1</li>
                        <li>
                          MerkleRoot:
                          {' '}
                          0000000000000000000000000000000000000000000000000000000000000000
                        </li>
                        <li>Time: 1533096000</li>
                        <li>
                          PreviousBlockHash:
                          {' '}
                          0000000000000000000000000000000000000000000000000000000000000000
                        </li>
                        <li>
                          NextBlockHash:
                          {' '}
                          {'""'}
                        </li>
                        <li>BlockProducer: a</li>
                        <li>
                          BlockProducerSign:
                          {' '}
                          {'""'}
                        </li>
                        <li>
                          Data:
                          {' '}
                          {'""'}
                        </li>
                        <li>
                          Txs:
                          {' '}
                          <Link to={`/block/${blockHash}/txs`}>100</Link>
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

export default Block;
