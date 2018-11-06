import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getBlock } from '@/reducers/constant/action';

class Txs extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    actionGetBlock: PropTypes.func.isRequired,
    block: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const { match, block } = this.props;
    const { blockHash } = match.params;

    this.state = {
      blockHash,
      block,
    };

    this.fetch();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.block[prevState.blockHash] ?.updatedAt
        !== prevState.block[prevState.blockHash] ?.updatedAt
    ) {
      if (!nextProps.block[prevState.blockHash].data.NextBlockHash) {
        return { block: nextProps.block, isLatest: true };
      }
      return { block: nextProps.block, isLatest: false };
    }
    if (nextProps.match.params.blockHash !== prevState.blockHash) {
      return { blockHash: nextProps.match.params.blockHash };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { blockHash, isLatest } = this.state;
    if (prevState.blockHash !== blockHash) {
      this.fetch();
    }
    if (prevState.blockHash === blockHash && isLatest) {
      setTimeout(() => this.fetch(), 1000);
    }
  }

  fetch = () => {
    const { actionGetBlock } = this.props;
    const { blockHash } = this.state;
    actionGetBlock(blockHash);
  }


  render() {
    const { blockHash, block } = this.state;

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
                  <div>
                    List of txs
                    <div>
                      <ul>
                        {block[blockHash] && block[blockHash].data.Txs.map(tx => (
                          <li key={tx.Hash}>
                            <Link to={`/tx/${tx.Hash}`}>{tx.Hash}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
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
)(Txs);
