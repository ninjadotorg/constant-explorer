import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getTx } from '@/reducers/constant/action';

class Tx extends React.Component {
  static propTypes = {
    tx: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    actionGetTx: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { match, actionGetTx, tx } = this.props;
    const { txHash } = match.params;

    this.state = {
      txHash,
      tx,
    };

    actionGetTx(txHash);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.tx[prevState.txHash] ?.updatedAt
        !== prevState.tx[prevState.txHash] ?.updatedAt
    ) {
      return { tx: nextProps.tx };
    }
    return null;
  }

  render() {
    const { txHash, tx } = this.state;

    let specTx = tx[txHash];

    if (!specTx) {
      return null;
    }

    specTx = specTx.data;

    console.log(specTx);

    const chainId = 1;

    return (
      <div className="c-explorer-page c-explorer-page-tx">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="c-breadcrumb">
                <ul>
                  <li><Link to="/">Explorer</Link></li>
                  <li><Link to="/chains">Chain list</Link></li>
                  <li><Link to={`/chain/${chainId}`}>{`Chain #${chainId}`}</Link></li>
                  <li>
                    <Link
                      to={`/block/${specTx.BlockHash}`}
                      className="c-text-ellipsis c-hash"
                      style={{ maxWidth: '100px', display: 'inline-block', verticalAlign: 'top' }}
                    >
                      {specTx.BlockHash}
                    </Link>
                  </li>
                  <li><Link to={`/block/${specTx.BlockHash}/txs`}>TXs</Link></li>
                  <li><Link className="c-hash c-text-cut" to={`/tx/${txHash}`}>{txHash}</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-12">
              <div className="block content">
                <div className="block-heading">
                  Tx
                </div>
                <div className="c-hash">{txHash}</div>
              </div>
            </div>
            <div className="col-12">
              <div className="block content">
                <table className="c-table">
                  <tbody>
                    <tr>
                      <td>Version</td>
                      <td>{specTx.Version}</td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>{specTx.Type}</td>
                    </tr>
                    <tr>
                      <td>Fee</td>
                      <td>{specTx.Fee}</td>
                    </tr>
                    <tr>
                      <td>Lock time</td>
                      <td>{specTx.LockTime}</td>
                    </tr>
                    <tr>
                      <td>JSPubKey</td>
                      <td className="c-hash" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{specTx.JSPubKey}</td>
                    </tr>
                    <tr>
                      <td>JSSig</td>
                      <td className="c-hash" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{specTx.JSSig}</td>
                    </tr>
                    <tr>
                      <td>AddressLastByte</td>
                      <td>{specTx.AddressLastByte}</td>
                    </tr>
                    <tr>
                      <td>Descs</td>
                      <td><pre>{JSON.stringify(specTx.Descs, null, 4)}</pre></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    tx: state.constant.tx,
  }),
  ({
    actionGetTx: getTx,
  }),
)(Tx);
