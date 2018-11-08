import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlockchainInfo } from '@/reducers/constant/action';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  static propTypes = {
    actionGetBlockChainInfo: PropTypes.func.isRequired,
    chainInfo: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const { chainInfo } = this.props;

    this.state = {
      chainInfo,
      searchError: '',
    };

    const { actionGetBlockChainInfo } = this.props;
    actionGetBlockChainInfo();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chainInfo.updatedAt !== prevState.chainInfo.updatedAt) {
      return { chainInfo: nextProps.chainInfo };
    }
    return null;
  }

  submitSearch = (e) => {
    e.preventDefault();
    const keyword = this.searchInput.value;
    console.log(keyword);
    this.setState({ searchError: 'This\'s not Tx hash or Block hash' });
  }

  render() {
    const { chainInfo, searchError } = this.state;
    if (!chainInfo.ChainName) {
      return null;
    }
    const bestBlocks = chainInfo.BestBlocks;

    const totalTxs = Object.keys(bestBlocks).reduce(
      (accumulator, blockIndex) => (
        parseInt(accumulator, 10) + parseInt(bestBlocks[blockIndex].TotalTxs, 10)
      ),
    );

    const totalBlocks = Object.keys(bestBlocks).reduce(
      (accumulator, blockIndex) => (
        parseInt(accumulator, 10) + parseInt(bestBlocks[blockIndex].Height, 10)
      ),
    );

    return (
      <div className="c-explorer-page c-explorer-page-home">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="home-top-info-container block">
                <ul className="home-top-info c-list-inline">
                  <li>
                    <Link to="/">
                      <div className="data c-color-black">{chainInfo.ChainName}</div>
                      <div className="title">Network</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/committees">
                      <div className="data c-color-black">0</div>
                      <div className="title">Total candidates</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/chains">
                      <div className="data c-color-black">20</div>
                      <div className="title">Total chain</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <div className="data c-color-black">{totalBlocks}</div>
                      <div className="title">Total blocks</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <div className="data c-color-black">{totalTxs}</div>
                      <div className="title">Total txs</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12">
              <div className="block content home-search">
                <div className="title">
                  Search
                </div>
                <form onSubmit={this.submitSearch}>
                  <input
                    type="text"
                    className="c-input"
                    placeholder="Block hash, tx hash, account address, ..."
                    ref={(div) => { this.searchInput = div; return null; }}
                  />
                  {searchError && <span className="c-text-error">{searchError}</span>}
                </form>
              </div>
            </div>
            <div className="col-12">
              <div className="block content">
                <div className="block-heading">
                  Best blocks
                </div>
                <table className="c-table">
                  <thead>
                    <tr>
                      <th>Block hash</th>
                      <th>Chain #</th>
                      <th>Total Txs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(bestBlocks).map(key => (
                      <tr key={key}>
                        <td><Link to={`/block/${bestBlocks[key].Hash}`} className="c-hash">{bestBlocks[key].Hash}</Link></td>
                        <td><Link to={`/chain/${parseInt(key, 10) + 1}`}>{parseInt(key, 10) + 1}</Link></td>
                        <td>{bestBlocks[key].TotalTxs}</td>
                      </tr>
                    ))}
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
    chainInfo: state.constant.chainInfo,
  }),
  ({
    actionGetBlockChainInfo: getBlockchainInfo,
  }),
)(Home);
