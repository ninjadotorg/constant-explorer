import React from 'react';
import { connect } from 'react-redux';
// import cn from '@sindresorhus/class-names';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getBlock } from '@/reducers/constant/action';

class Block extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    actionGetBlock: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { match, actionGetBlock } = this.props;
    const { blockHash } = match.params;

    this.state = {
      blockHash,
      block: {},
    };

    actionGetBlock(blockHash);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if (
      nextProps.block[prevState.blockHash] ?.updatedAt
        !== prevState.block[prevState.blockHash] ?.updatedAt
    ) {
      return { block: nextProps.block };
    }
    return null;
  }

  render() {
    const { blockHash, block } = this.state;
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
                  <div>Block information</div>
                  <div>
                    <ul>
                      <li>
                        ChainID:
                        {' '}
                        <Link to={`/chain/${block[blockHash] ?.data ?.ChainID + 1}`}>{(block[blockHash] ?.data.ChainID || 0) + 1}</Link>
                      </li>
                      <li>{`Version: ${block[blockHash] ?.data.Version || ''}`}</li>
                      <li>{`Height: ${block[blockHash] ?.data.Height || ''}`}</li>
                      <li>{`Confirmations: ${block[blockHash] ?.data.confirmations || ''}`}</li>
                      <li>{`MerkleRoot: ${block[blockHash] ?.data.MerkleRoot || ''}`}</li>
                      <li>{`Time: ${block[blockHash] ?.data.Time || ''}`}</li>
                      <li>
                        PreviousBlockHash:
                        <Link to={`/block/${block[blockHash] ?.data.PreviousBlockHash}`}>{`${block[blockHash] ?.data.PreviousBlockHash || ''}`}</Link>
                      </li>
                      <li>
                        NextBlockHash:
                        <Link to={`/block/${block[blockHash] ?.data.NextBlockHash}`}>{`${block[blockHash] ?.data.NextBlockHash || ''}`}</Link>
                      </li>
                      <li>{`BlockProducer: ${block[blockHash] ?.data.BlockProducer || ''}`}</li>
                      <li>{`BlockProducerSign: ${block[blockHash] ?.data.BlockProducerSign || ''}`}</li>
                      <li>{`Data: ${block[blockHash] ?.data.Data || ''}`}</li>
                      <li>
                        Txs:
                        {' '}
                        <Link to={`/block/${blockHash}/txs`}>100</Link>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    block: state.constant.block,
  }),
  ({
    actionGetBlock: getBlock,
  }),
)(Block);
